import React from 'react';

interface Props {
  height: number;
  width: number;
  className?: string;
}

const DoubleNextIcon: React.FC<Props> = ({
  height,
  width,
  className
}: Props) => {
  return (
    <svg
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 17l5-5-5-5m-5 10 5-5-5-5"
      />
    </svg>
  );
};

export default DoubleNextIcon;
