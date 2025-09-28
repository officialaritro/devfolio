import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    count: 0,
    message: "Chat functionality is currently disabled"
  });
}