import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { withAdmin } from "@/lib/handlers";
import { serviceSchema } from "@/lib/schemas";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

async function uploadToCloudinary(file: File): Promise<{ url: string; public_id: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fs = await import("fs/promises");
  const os = await import("os");
  const path = await import("path");

  const tmpDir = os.tmpdir();
  const tempFilePath = path.join(tmpDir, file.name);
  await fs.writeFile(tempFilePath, buffer);

  const uploaded = await cloudinary.uploader.upload(tempFilePath, { folder: "services" });
  await fs.unlink(tempFilePath);
  return { url: uploaded.secure_url, public_id: uploaded.public_id };
}

const handler = withAdmin(async ({ req }) => {
  await dbConnect();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  // === POST / PUT ===
  if (req.method === "POST" || req.method === "PUT") {
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
    }

    let formData: FormData;
    try {
      formData = await req.formData(); // This may throw if body already read
    } catch (err) {
      return NextResponse.json(
        { error: "Request body already consumed or invalid" },
        { status: 400 }
      );
    }

    // Extract fields from formData
    const fields: any = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        fields[key] = value;
      }
    });

    // Validate fields using zod
    const parsed = req.method === "POST"
      ? serviceSchema.safeParse(fields)
      : serviceSchema.partial().safeParse(fields);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    // Handle file upload
    const imageFile = formData.get("image") as File | null;
    let imageUrl = "";
    let imageId = "";

    if (imageFile && imageFile.size > 0) {
      const uploaded = await uploadToCloudinary(imageFile);
      imageUrl = uploaded.url;
      imageId = uploaded.public_id;
    }

    // === POST (create) ===
    if (req.method === "POST") {
      if (!imageUrl || !imageId) {
        return NextResponse.json({ error: "Image is required" }, { status: 400 });
      }

      const newService = await Service.create({
        ...parsed.data,
        image: imageUrl,
        imageId,
      });

      return NextResponse.json(newService, { status: 201 });
    }

    // === PUT (update) ===
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const existing = await Service.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete old image if replaced
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

  // === GET ===
  if (req.method === "GET") {
    if (id) {
      const service = await Service.findById(id);
      if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(service);
    }

    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json(services);
  }

  // === DELETE ===
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

  // === Unsupported Method ===
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
