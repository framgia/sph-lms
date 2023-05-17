import React from 'react';

interface Props {
  className?: string;
}

const DoubleArrowIcon: React.FC<Props> = ({ className }: Props) => {
  return (
    <svg
      height={23}
      width={23}
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
        // d="M11 17l-5-5 5-5m4 10-5-5 5-5"
        d="M11 17l-5-5 5-5m5 10-5-5 5-5"
      />
    </svg>
  );
};

export default DoubleArrowIcon;
