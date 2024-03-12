import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";
import { readStream } from "@/utils/util";
import { prepareConnection } from "@/db/index";
import { User } from "@/db/entity/user";
import { UserAuth } from "@/db/entity";
import cookie from "cookie";

const redis = new Redis();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await readStream(req.body);
    const { phone, verifyCode, identity_type = "phone" } = JSON.parse(data);
    const db = await prepareConnection();

    const userAuthRepo = db.getRepository(UserAuth);
    const correctVerifyCode = await redis.get(phone);

    if (verifyCode === correctVerifyCode) {
      let userAuth = await userAuthRepo.findOne({
        where: { identity_type, identifier: phone },
        relations: ["user"],
      });

      if (!userAuth) {
        const user = new User();
        user.nickname = `用户_${Math.floor(Math.random() * 10000)}`;
        user.avatar = "/images/avatar.jpeg";
        user.job = "暂无";
        user.introduce = "暂无";

        userAuth = userAuthRepo.create({
          identifier: phone,
          identity_type,
          credential: verifyCode,
          user,
        });
        await userAuthRepo.save(userAuth);
      }

      const { user } = userAuth;
      const { id, nickname, avatar } = user;
      const cookieStr = cookie.serialize(
        "user",
        JSON.stringify({ id, nickname, avatar }),
        {
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        }
      );

      await redis.set(id.toString(), JSON.stringify({ nickname, avatar }));

      return new NextResponse(
        JSON.stringify({
          code: 0,
          msg: "登录成功",
          data: { userId: id, nickname, avatar },
        }),
        {
          headers: {
            "Set-Cookie": cookieStr,
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          code: -1,
          msg: "验证码错误",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new NextResponse(
      JSON.stringify({
        code: -1,
        msg: "内部服务器错误",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
