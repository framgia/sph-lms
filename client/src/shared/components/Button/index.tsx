/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

export interface ButtonProps {
  text: string;
  color?: string;
  width?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  hover?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  color,
  width,
  onClick,
  type,
  hover
}: ButtonProps) => {
  return (
    <div className="flex flex-row">
      <button
        className={`mb-4 text-white font-bold py-2 px-3 rounded border ${color} ${hover} ${width}`}
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: 'bg-blue-500',
  width: 'w-auto',
  onClick: () => {},
  type: 'button',
  hover: ''
};

export default Button;
