"use client";

import React from "react";
import Image from "next/image";
import close from "@/assets/close.png";

interface PTCModalProps {
  children?: React.ReactNode | string;
  onClose?: () => void;
  isOpen?: boolean;
  title?: string;
}

export const PTCModal: React.FC<PTCModalProps> = (props: PTCModalProps) => {
  const { children, isOpen = false, title } = props;

  return (
    <div>
      {isOpen ? (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-lg w-96">
              <div className="flex justify-between items-center mb-8">
                <div className="text-xl font-bold ">{title}</div>
                <Image
                  className="h-6 w-6 cursor-pointer"
                  onClick={props.onClose}
                  src={close}
                  alt="Close button"
                />
              </div>
              <div className="mb-4">{children}</div>
              <div className="flex justify-end"></div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
