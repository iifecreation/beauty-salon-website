import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import { withAdmin } from "@/lib/handlers";
import { courseSchema } from "@/lib/schemas";
import cloudinary from "@/lib/cloudinary";
import path from "path";

export const runtime = "nodejs";

async function uploadToCloudinary(file: File): Promise<{ url: string; public_id: string }> {
  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await cloudinary.uploader.upload_stream({ folder: "courses" }, (err, res) => {
    if (err) throw err;
    return res;
  });

  // Cloudinary node SDK requires using uploader.upload, so we need to write buffer to temp file or use stream
  // Simplest: write buffer to temp file
  const fs = await import("fs/promises");
  const tmp = await import("os").then(os => os.tmpdir());
  const tempFilePath = path.join(tmp, file.name);
  await fs.writeFile(tempFilePath, buffer);

  const uploaded = await cloudinary.uploader.upload(tempFilePath, { folder: "courses" });
  return { url: uploaded.secure_url, public_id: uploaded.public_id };
}

const handler = withAdmin(async ({ req }: { req: NextRequest }) => {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (req.method === "POST" || req.method === "PUT") {
    const formData = await req.formData();
    console.log(formData);
    
    const fields: any = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") fields[key] = value;
    });

    const parsed = req.method === "POST"
      ? courseSchema.safeParse(fields)
      : courseSchema.partial().safeParse(fields);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    // Get file
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

      const newCourse = await Course.create({
        ...parsed.data,
        image: imageUrl,
        imageId,
      });

      return NextResponse.json(newCourse, { status: 201 });
    }

    // PUT
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const existing = await Course.findById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (imageFile && existing.imageId) {
      await cloudinary.uploader.destroy(existing.imageId);
    }

    const updated = await Course.findByIdAndUpdate(
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
      const course = await Course.findById(id);
      if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(course);
    }

    const list = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json(list);
  }

  // DELETE
  if (req.method === "DELETE") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const course = await Course.findById(id);
    if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (course.imageId) {
      await cloudinary.uploader.destroy(course.imageId);
    }

    await Course.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
