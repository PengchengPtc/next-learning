import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";
import { readStream } from "@/utils/util";
import { prepareConnection } from "@/db/index";
import { User } from "@/db/entity/user";
import { UserAuth } from "@/db/entity";

const redis = new Redis();

export async function POST(req: NextRequest, res: NextResponse) {
  const data = readStream(req.body);
  const { phone, verifyCode, identity_type = "phone" } = JSON.parse(await data);
  const db = await prepareConnection();

  // const userRepo = db.getRepository(User);
  const userAuthRepo = db.getRepository(UserAuth);

  const correctVerifyCode = await redis.get(phone);

  if (verifyCode === correctVerifyCode) {
    const userAuth = await userAuthRepo.findOne({
      where: {
        identity_type,
        identifier: phone,
      },
      relations: ["user"],
    });
    if (userAuth) {
      const user = userAuth.user;
      const { id, nickname, avatar } = user;
      // 用redis存储,RedisKey通常期望是一个string或者其他特定类型，而不是number。
      await redis.set(id.toString(), JSON.stringify({ nickname, avatar }));
      console.log(redis.get(id.toString()));
      return NextResponse.json({
        code: 0,
        msg: "登录成功",
        data: {
          userId: id,
          nickname,
          avatar,
        },
      });
    }
    
    const user = new User();
    user.nickname = `用户_${Math.floor(Math.random() * 10000)}`;
    user.avatar = "/images/avatar.jpg";
    user.job = "暂无";
    user.introduce = "暂无";

    const userAuthNew = new UserAuth();
    userAuthNew.identifier = phone;
    userAuthNew.identity_type = identity_type;
    userAuthNew.credential = correctVerifyCode as string;
    userAuthNew.user = user;

    const resUserAuth = await userAuthRepo.save(userAuthNew);
    const {
      user: { id, nickname, avatar },
    } = resUserAuth;
    await redis.set(id.toString(), JSON.stringify({ nickname, avatar }));
    return NextResponse.json({
      code: 0,
      msg: "登录成功",
      data: {
        userId: id,
        nickname,
        avatar,
      },
    });
  }

  return NextResponse.json({
    code: -1,
    msg: "验证码错误",
  });
}
