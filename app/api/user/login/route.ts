import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";
import { readStream } from "@/utils/util";

const redis = new Redis();

export async function POST(req: NextRequest, res: NextResponse) {
  const data = readStream(req.body);
  const { phone, verifyCode } = JSON.parse(await data);

  const correctVerifyCode = await redis.get(phone);

  if (verifyCode === correctVerifyCode) {
    return NextResponse.json({
      code: 0,
      data: {
        token: "1234567890",
      },
    });
  }

  return NextResponse.json({
    code: 1,
    data: null,
  });
}
