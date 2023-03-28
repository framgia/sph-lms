/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { FC } from 'react';

export interface ListIconProps {
  classname?: string
}

const ListIcon: FC<ListIconProps> = ({ classname }: ListIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={classname}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

  );
};

ListIcon.defaultProps = {
  classname: 'w-6 h-6'
};

export default ListIcon;
