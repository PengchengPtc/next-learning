import React from 'react';

interface PTCFormInputProps {
  name?: string;
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  initValue?: string;
  children?: React.ReactNode;
  inputWidth?: string; 
}

export const PTCFormInput: React.FC<PTCFormInputProps> = (
  props: PTCFormInputProps
) => {
  const { name, label, value, onChange, children, inputWidth = '100%' } = props;
  const paddingRight = value ? `calc(100% - ${inputWidth})` : '0px'; // 用户输入内容后，调整 paddingRight

  return (
    <div className="relative flex flex-col space-y-2 w-full">
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded w-full"
        placeholder={`请您输入${label}`}
        style={{ paddingRight }} // 使用 paddingRight 限制输入文本的区域长度
      />
      <div className="absolute top-0.5 right-2 flex items-center">
        {children}
      </div>
    </div>
  );
};
