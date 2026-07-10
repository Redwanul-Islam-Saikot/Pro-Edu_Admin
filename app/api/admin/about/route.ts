// app/api/admin/about/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import About from "@/app/api/models/About";

export async function GET() {
  try {
    await connectDB();
    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        title: "",
        subtitle: "",
        image: "",
        paragraphs: [""],
      });
    }

    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    let about = await About.findOne();

    if (!about) {
      about = await About.create(body);
    } else {
      about = await About.findByIdAndUpdate(about._id, body, { new: true });
    }

    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update" },
      { status: 500 },
    );
  }
}
