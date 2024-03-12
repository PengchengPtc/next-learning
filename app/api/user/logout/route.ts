import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(req: NextRequest, res: NextResponse) {
  const cookieStr = cookie.serialize("user", "", {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  // 清空cookies
  return new NextResponse(
    JSON.stringify({
      code: 0,
      msg: "退出成功",
    }),
    {
      headers: {
        "Set-Cookie": cookieStr,
        "Content-Type": "application/json",
      },
    }
  );
}
