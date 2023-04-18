import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width, height, className }: LogoProps) => {
  return (
    <div className={className}>
      <Link href="/">
        <Image
          src="/sun-asterisk-logo.png"
          alt="SPH-LMS Logo"
          width={width}
          height={height}
        />
      </Link>
    </div>
  );
};

Logo.defaultProps = {
  width: 180,
  height: 40,
  className: 'flex justify-center'
};

export default Logo;
