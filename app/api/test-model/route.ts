// app/api/test-model/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Home from "@/app/api/models/Home";

export async function GET() {
  try {
    await connectDB();
    const homeData = await Home.find();
    return NextResponse.json({ success: true, data: homeData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    await connectDB();
    const newHome = await Home.create({
      title: "Test Title",
      subtitle: "Test Subtitle",
      description: "This is a test entry",
    });
    return NextResponse.json({ success: true, data: newHome });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to create data" },
      { status: 500 },
    );
  }
}
