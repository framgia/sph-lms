import React from 'react';

interface sideBarProps {
  children: any;
}

export const LeftSideBar: React.FunctionComponent<sideBarProps> = ({
  children
}: sideBarProps) => {
  return (
    <div className="overflow top-0 bottom-0 w-6/12 left-20 ml-28">
      {children}
    </div>
  );
};
