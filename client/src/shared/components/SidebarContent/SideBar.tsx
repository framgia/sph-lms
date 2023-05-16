import { type FC, Fragment, type ReactElement } from 'react';

export interface SideBarProps {
  title: string;
  children?: ReactElement;
}

const SideBar: FC<SideBarProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default SideBar;
