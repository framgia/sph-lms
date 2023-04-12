/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

export interface ButtonProps {
  text: string;
  textColor?: string;
  color?: string;
  width?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  hover?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  textColor,
  color,
  width,
  onClick,
  type,
  hover
}: ButtonProps) => {
  return (
    <div className="flex flex-row">
      <button
        className={`mb-4 font-bold py-2 px-3 rounded mx-1 ${textColor} ${color} ${hover} ${width}`}
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
  textColor: 'text-white',
  width: 'w-auto',
  onClick: () => {},
  type: 'button',
  hover: ''
};

export default Button;
