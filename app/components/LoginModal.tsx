import React, { useEffect, useState } from "react";
import { PTCModal, PTCForm, PTCFormInput, PTCButton } from "./Ui";
import { useForm } from "./Ui/PTCForm";
import { CountDown } from "./CountDown";
import request from "@/service/fetch";
import { message } from "antd";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function LoginModal(props: LoginModalProps) {
  const form = useForm();
  const { isOpen, setIsOpen } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);

  const onFinish = () => {
    console.log("form.values", form.values);
    request
      .post("/api/user/login", form.values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        console.log(res);
        if (res.code === 0) {
          message.success("登录成功");
          setIsOpen(false);
        } else {
          message.error("登录失败");
        }
      });
  };

  const handleGetVerifyCode = () => {
    let phoneReg = /^1[3456789]\d{9}$/;
    if (!form?.getValue("phone") || !phoneReg.test(form?.getValue("phone"))) {
      message.warning("请输入正确手机号");
      return;
    }

    request
      .post(
        "/api/user/sendVerifyCode",
        {
          to: form?.getValue("phone"),
          templateId: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        console.log(res);

        if (res?.code === 0) {
          setIsShowVerifyCode(true);
        } else {
          message.error(res?.msg || "未知错误");
        }
      });
  };
  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };

  return (
    <PTCModal
      title="手机验证码登陆/注册"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <PTCForm form={form}>
        <PTCFormInput name="phone" label="手机号" initValue="15555555878" />
        <PTCFormInput
          type="code"
          name="verifyCode"
          label="验证码"
        >
          <span
            className="text-blue-500  cursor-pointer"
            onClick={handleGetVerifyCode}
          >
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountDownEnd} />
            ) : (
              "获取验证码"
            )}
          </span>
        </PTCFormInput>
        <PTCButton onClick={onFinish}>登录/注册</PTCButton>
      </PTCForm>
    </PTCModal>
  );
}
