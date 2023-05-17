import React from 'react';

interface Props {
  className?: string;
}

const ArrowIcon: React.FC<Props> = ({ className }: Props) => {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17l-5-5 5-5" />
    </svg>
  );
};

export default ArrowIcon;
