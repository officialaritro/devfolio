import { NextResponse } from "next/server";

import { getChatsCollection } from "@/lib/mongo";

export async function GET() {
  try {
    const chatsCollection = await getChatsCollection()
    const count = await chatsCollection.countDocuments();

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Failed to get count of chats: ", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}