/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { FC } from 'react';

export interface EllipsesHorizontalIconProps {
  height?: number;
  width?: number;
  classname?: string;
}

const EllipsesHorizontalIcon: FC<EllipsesHorizontalIconProps> = ({
  height,
  width,
  classname,
}: EllipsesHorizontalIconProps) => {
  return (
    <svg
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={classname}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
};

EllipsesHorizontalIcon.defaultProps = {
  height: 25,
  width: 25,
  classname: '',
};

export default EllipsesHorizontalIcon;
