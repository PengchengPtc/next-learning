import { NextResponse, type NextRequest } from "next/server";
import { format } from "date-fns";
import md5 from "md5";
import { encode } from "js-base64";
import request from "@/service/fetch";

import { readStream } from "@/utils/util";
import Redis from "ioredis";

const redis = new Redis();

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
  res: NextResponse
) {
  const data = await readStream(req.body);
  const { to, templateId } = JSON.parse(data);
  console.log("to", to, "templateId", templateId);

  const AppId = "2c94811c8cd4da0a018e088a59dd2e22";
  const AccountId = "2c94811c8cd4da0a018e088a584b2e1b";
  const AuthToken = "7d39299040544231938385294e8b54b2";
  const NowDate = format(new Date(), "yyyyMMddHHmmss");
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
  const Authorization = encode(`${AccountId}:${NowDate}`);
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  // 验证码过期时间
  const expireMinute = "5";
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;
  console.log("to", to, "templateId", templateId);

  const response = await request.post(
    url,
    {
      to,
      templateId,
      appId: AppId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        Authorization,
      },
    }
  );
  console.log("response", response);
  const { statusCode, templateSMS, statusMsg } = response as any;
  console.log(process.env.SESSION_COOKIE_NAME, "dfasfsdfhhhh???");

  if (statusCode === "000000") {
    await redis.set(to, verifyCode, "EX", 60 * 5);

    return NextResponse.json({
      code: 0,
      msg: statusMsg,
      data: {
        templateSMS,
      },
    });
  } else {
    return NextResponse.json({
      code: statusCode,
      msg: statusMsg,
    });
  }
}
