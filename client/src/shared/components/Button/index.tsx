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
  buttonClass?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  textColor,
  color,
  width,
  onClick,
  type,
  hover,
  buttonClass
}: ButtonProps) => {
  return (
    <div className="flex flex-row">
      <button
        className={`font-semibold rounded mx-1 ${textColor} ${color} ${hover} ${width} ${buttonClass}`}
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
  hover: '',
  buttonClass: ''
};

export default Button;
