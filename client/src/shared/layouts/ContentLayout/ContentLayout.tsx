import React from 'react';

interface sideBarProps {
  children: any;
}

export const ContentLayout: React.FunctionComponent<sideBarProps> = ({
  children
}: sideBarProps) => {
  return <div className="mx-36">{children}</div>;
};
