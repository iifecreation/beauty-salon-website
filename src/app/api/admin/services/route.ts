import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { withAdmin } from "@/lib/handlers";
import { serviceSchema } from "@/lib/schemas";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

async function uploadToCloudinary(file: File): Promise<{ url: string; public_id: string }> {
  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fs = await import("fs/promises");
  const os = await import("os");
  const path = await import("path");

  const tmpDir = os.tmpdir();
  const tempFilePath = path.join(tmpDir, file.name);
  await fs.writeFile(tempFilePath, buffer);

  const uploaded = await cloudinary.uploader.upload(tempFilePath, { folder: "services" });
  await fs.unlink(tempFilePath); // Clean up temp file
  return { url: uploaded.secure_url, public_id: uploaded.public_id };
}

const handler = withAdmin(async ({ req }: { req: NextRequest }) => {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (req.method === "POST" || req.method === "PUT") {
    const formData = await req.formData();

    // Extract fields from formData
    const fields: any = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") fields[key] = value;
    });

    // Validate fields
    const parsed = req.method === "POST"
      ? serviceSchema.safeParse(fields)
      : serviceSchema.partial().safeParse(fields);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    // Get file from formData
    const imageFile = formData.get("image") as File | null;

    let imageUrl = "";
    let imageId = "";

    if (imageFile && imageFile.size > 0) {
      const uploaded = await uploadToCloudinary(imageFile);
      imageUrl = uploaded.url;
      imageId = uploaded.public_id;
    }

    if (req.method === "POST") {
      if (!imageUrl || !imageId) {
        return NextResponse.json({ error: "Image is required" }, { status: 400 });
      }

      const newService = await Service.create({
        ...parsed.data,
        image: imageUrl,
        imageId, // add imageId to your schema if you want to store it for delete/update
      });

      return NextResponse.json(newService, { status: 201 });
    }

    // PUT - update service
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const existing = await Service.findById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (imageFile && existing.imageId) {
      await cloudinary.uploader.destroy(existing.imageId);
    }

    const updated = await Service.findByIdAndUpdate(
      id,
      {
        ...parsed.data,
        image: imageUrl || existing.image,
        imageId: imageId || existing.imageId,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  }

  // GET
  if (req.method === "GET") {
    if (id) {
      const service = await Service.findById(id);
      if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(service);
    }

    const list = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json(list);
  }

  // DELETE
  if (req.method === "DELETE") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const service = await Service.findById(id);
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (service.imageId) {
      await cloudinary.uploader.destroy(service.imageId);
    }

    await Service.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
