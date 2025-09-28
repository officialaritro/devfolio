import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    error: "Chat functionality is currently disabled",
    message: "Enable MongoDB connection to use chat features"
  }, { status: 503 });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    error: "Chat functionality is currently disabled", 
    message: "Enable MongoDB connection to send messages"
  }, { status: 503 });
}