import { NextResponse, type NextRequest } from "next/server";
import { format } from "date-fns";
import md5 from "md5";
import { encode } from "js-base64";
import request from "@/service/fetch";

const readStream = async (stream: any) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return result;
    }
    result += decoder.decode(value);
  }
};

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
  res: NextResponse
) {
  const data = await readStream(req.body);
  const { to, templateId } = JSON.parse(data);
  console.log("to", to, "templateId", templateId);

  const AppId = "2c94811c8cd4da0a018e088a59dd2e2";
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

  return NextResponse.json(response);
}
