import React from 'react';

interface ContainerProps {
  children: any;
  padding?: string;
}

const Container: React.FC<ContainerProps> = ({ children, padding }: ContainerProps) => {
  return <div className={`container mx-auto ${padding}`}>{children}</div>;
};

Container.defaultProps = {
  padding: 'px-20'
};

export default Container;
