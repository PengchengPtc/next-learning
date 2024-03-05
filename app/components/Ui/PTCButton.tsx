"use client";

import React from "react";

interface ButtonProps {
  children?: React.ReactNode | string;
  onClick?: () => void;
}

export function PTCButton(props: ButtonProps) {
  const { children } = props;
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}
