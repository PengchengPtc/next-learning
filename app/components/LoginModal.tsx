import React, { useEffect, useState } from "react";
import { PTCModal, PTCForm, PTCFormInput, PTCButton } from "./Ui";
import { useForm } from "./Ui/PTCForm";
import { CountDown } from "./CountDown";

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
  };

  const handleGetVerifyCode = () => {
    setIsShowVerifyCode(true);
  };
  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };

  return (
    <PTCModal
      title="登陆"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <PTCForm form={form}>
        <PTCFormInput name="phone" label="电话" initValue="15555555878" />
        <PTCFormInput name="verifyCode" label="验证码" initValue="15555555878" inputWidth='50px'>
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

        <PTCButton onClick={onFinish}>登录</PTCButton>
      </PTCForm>
    </PTCModal>
  );
}
