import React from 'react';

interface ContainerProps {
  children: any;
}

const ContentLayout: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return <div className="container mx-auto px-28">{children}</div>;
};

export default ContentLayout;
