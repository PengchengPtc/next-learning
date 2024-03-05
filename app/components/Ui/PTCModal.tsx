"use client";

import React from "react";
import { PTCButton } from "./PTCButton";

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
              <div className="flex justify-between">
                <div className="text-xl font-bold mb-4">{title}</div>
                <PTCButton onClick={props.onClose}>关闭</PTCButton>
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
