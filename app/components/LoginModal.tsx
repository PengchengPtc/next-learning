import React, { useEffect, useState } from "react";
import { PTCModal, PTCForm, PTCFormInput } from "./Ui";
import { useForm } from "./Ui/PTCForm";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function LoginModal(props: LoginModalProps) {
  const form = useForm();
  const { isOpen, setIsOpen } = props;
//   useEffect(() => {
//     // Set default values when component mounts
//     form.setValue("phone", "15555555878");
//     form.setValue("verifyCode", "123456");
//   }, []);
  return (
    <PTCModal
      title="登陆"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <PTCForm form={form}>
        <PTCFormInput name="phone" label="电话" initValue="15555555878"/>
        <PTCFormInput name="verifyCode" label="验证码" initValue="15555555878"/>
      </PTCForm>
    </PTCModal>
  );
}
