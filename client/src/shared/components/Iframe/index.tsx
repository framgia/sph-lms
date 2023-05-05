import React from 'react';

export interface IframeProps {
  src: string;
  className?: string;
  width?: string;
  height?: string;
  title?: string;
}

const Iframe: React.FunctionComponent<IframeProps> = ({
  src,
  className,
  width,
  height,
  title
}: IframeProps) => {
  return (
    <div>
      <iframe
        className={`mx-auto m-2 ${className ?? ''}`}
        width={width}
        height={height}
        src={src}
        title={title}
      ></iframe>
    </div>
  );
};

Iframe.defaultProps = {
  className: '',
  width: '100%',
  height: '600',
  title: ''
};

export default Iframe;
