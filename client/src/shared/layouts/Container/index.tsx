import React from 'react';

interface ContainerProps {
  children: any;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }: ContainerProps) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};

Container.defaultProps = {
  className: 'px-20'
};

export default Container;
