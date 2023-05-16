import { type FC, Fragment, type ReactElement } from 'react';

export interface TabProps {
  title: string;
  children?: ReactElement;
}

const Tab: FC<TabProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default Tab;
