import { NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";

export async function GET() {
  try {
    const db = await connectDB();

    return NextResponse.json({
      status: "connected",
      db: db.databaseName,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
