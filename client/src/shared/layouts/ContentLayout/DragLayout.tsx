import React from 'react';

interface sideBarProps {
  children: any;
}

export const DragLayout: React.FunctionComponent<sideBarProps> = ({
  children
}: sideBarProps) => {
  return <div className="">{children}</div>;
};
