/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { FC } from 'react';

export interface EditIconProps {
  height?: number;
  width?: number;
  classname?: string;
}

const EditIcon: FC<EditIconProps> = ({
  height,
  width,
  classname
}: EditIconProps) => {
  return (
    <svg
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      fill="#325184"
      viewBox="0 0 24 24"
      stroke-width="0.7"
      stroke="currentColor"
      className={classname}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );
};

EditIcon.defaultProps = {
  height: 25,
  width: 25,
  classname: ''
};

export default EditIcon;
