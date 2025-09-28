import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Return disabled response
  return NextResponse.json(
    { 
      error: "Chat functionality is currently disabled",
      message: "This feature will be available when the chat system is enabled",
      chatId: id 
    }, 
    { status: 503 } // Service Unavailable
  );
}
