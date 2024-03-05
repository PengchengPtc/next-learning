import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> }
) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  console.log("🚀 ~ GET ~ data:", data);

  return NextResponse.json({ data });
}
