import { FC, ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  label: string | ReactNode;
  className: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ onClick, label, className, disabled }) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {label}
    </button>
  );
};
export default Button;
