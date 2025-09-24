import { NextRequest, NextResponse } from "next/server";

import { getChatsCollection } from "@/lib/mongo";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const chatsCollection = await getChatsCollection()
    const chat = await chatsCollection.findOne({ chatId: id });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ chat });
  } catch (error) {
    console.error("Failed to get chat: ", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}