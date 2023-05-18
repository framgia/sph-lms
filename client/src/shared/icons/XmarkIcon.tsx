/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { FC, HTMLProps } from 'react';

const XmarkIcon: FC<HTMLProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export default XmarkIcon;
