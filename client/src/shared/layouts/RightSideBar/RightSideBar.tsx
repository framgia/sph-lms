import React from 'react';

interface sideBarProps {
  children: any;
}

export const RightSideBar: React.FunctionComponent<sideBarProps> = ({
  children
}: sideBarProps) => {
  return (
    <div className="absolute top-0 bottom-0 right-20 w-80 mr-12 ml-6">
      {children}
    </div>
  );
};
