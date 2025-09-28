import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  const sessionId = new ObjectId().toString();
  
  return NextResponse.json({ 
    chatId: sessionId,
    error: "Chat functionality is currently disabled",
    message: "Chat initialization is disabled. Enable MongoDB to use this feature."
  }, { status: 503 });
}