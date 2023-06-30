import React, { FC, memo, ChangeEvent, forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  readOnly?: boolean;
  ref: React.Ref<HTMLInputElement>;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, placeholder, onChange, name, value, readOnly }, ref) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={className}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
