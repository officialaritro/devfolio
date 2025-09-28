import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    error: "Crawling functionality is currently disabled",
    message: "Enable MongoDB connection to use crawling features",
    data: null 
  }, { status: 503 });
}

export async function POST() {
  return NextResponse.json({
    error: "Crawling functionality is currently disabled",
    message: "Enable MongoDB connection to crawl and index content"
  }, { status: 503 });
}