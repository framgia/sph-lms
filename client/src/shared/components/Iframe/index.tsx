import React from 'react';

export interface IframeProps {
  src: string;
  className: string;
  width?: string;
  height?: string;
  title?: string;
  allowFullScreen?: boolean;
}

const Iframe: React.FunctionComponent<IframeProps> = ({
  src,
  className,
  width,
  height,
  title,
  allowFullScreen,
}: IframeProps) => {
  return (
    <div>
      <iframe
        className={`mx-auto m-2 ${className}`}
        width={width}
        height={height}
        src={src}
        title={title}
        allowFullScreen
      ></iframe>
    </div>
  );
};

Iframe.defaultProps = {
  className: '',
  width: '100%',
  height: '600',
  title: '',
  allowFullScreen: true,
};

export default Iframe;
