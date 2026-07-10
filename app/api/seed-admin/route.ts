// app/api/seed-admin/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import Admin from "@/app/api/models/Admin";

export async function GET() {
  try {
    await connectDB();

    const existing = await Admin.findOne({ email: "admin@proedu.com" });
    if (existing) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await Admin.create({
      email: "admin@proedu.com",
      password: hashedPassword,
      name: "Super Admin",
    });

    return NextResponse.json({ success: true, admin });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
