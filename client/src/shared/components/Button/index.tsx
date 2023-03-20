/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

export interface ButtonProps {
  text: string;
  color?: string;
  width?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  color,
  width,
  onClick,
  type
}: ButtonProps) => {
  const propStyle = {
    backgroundColor: color,
    width: width
  };

  return (
    <div className="flex flex-row">
      <button
        className="mb-4 text-white font-bold py-2 px-4 rounded border"
        style={propStyle}
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: '',
  width: 'auto',
  onClick: () => {},
  type: 'button'
};

export default Button;
