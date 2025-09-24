import { NextResponse } from "next/server";

import { appendToConversation } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const sessionId = new ObjectId().toString();

    await appendToConversation(sessionId, "Hey! How can I assist?", null, "bot");

    return NextResponse.json({ chatId: sessionId });
  } catch (error) {
    console.error("Failed to initialize chat: ", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
