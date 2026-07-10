// app/api/admin/home/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Home from "@/app/api/models/Home";

export async function GET() {
  try {
    await connectDB();
    let home = await Home.findOne();

    if (!home) {
      home = await Home.create({
        title: "",
        subtitle: "",
        heroImage: "",
        description: "",
      });
    }

    return NextResponse.json({ success: true, data: home });
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

    let home = await Home.findOne();

    if (!home) {
      home = await Home.create(body);
    } else {
      home = await Home.findByIdAndUpdate(home._id, body, { new: true });
    }

    return NextResponse.json({ success: true, data: home });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update" },
      { status: 500 },
    );
  }
}
