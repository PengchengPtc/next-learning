"use client";

import React from "react";

interface PTCFormInputProps {
  name?: string;
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  initValue?: string;
}

export const PTCFormInput: React.FC<PTCFormInputProps> = (
  props: PTCFormInputProps
) => {
  const { name, label, value, onChange } = props;
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded"
      />
    </div>
  );
};
