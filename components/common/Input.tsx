import React, { FC, ChangeEvent, forwardRef, KeyboardEvent } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  className: string;
  id?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onEnter?: () => void;
  value?: string;
  required?: boolean;
  readOnly?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, className, placeholder, onChange, name, value, onEnter, readOnly },
    ref
  ) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && onEnter) {
        onEnter();
      }
    };

    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={className}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
