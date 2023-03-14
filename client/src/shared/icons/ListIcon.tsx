/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { FC } from 'react';

export interface ListIconProps {
  height?: number,
  width?: number,
  classname?: string
}

const ListIcon: FC<ListIconProps> = ({ height, width, classname }: ListIconProps) => {
  return (
    <svg
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className={classname}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
      />
    </svg>
  );
};

ListIcon.defaultProps = {
  height: 25,
  width: 25,
  classname: ''
};

export default ListIcon;
