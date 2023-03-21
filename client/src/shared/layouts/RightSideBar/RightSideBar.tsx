import React from 'react';

interface sideBarProps {
  children: any;
}

export const RightSideBar: React.FunctionComponent<sideBarProps> = ({
  children
}: sideBarProps) => {
  return <div className="absolute top-10 right-40 pr-24">{children}</div>;
};
