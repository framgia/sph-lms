import { type FC } from 'react';
import SunBear from '../../icons/SunBear';

interface LogoProps {
  svgClass?: string;
  divClass?: string;
}

const Logo: FC<LogoProps> = ({ svgClass = '', divClass = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${divClass}`}>
      <SunBear className={`w-[40px] h-auto ${svgClass}`} />
      <div className="leading-none">
        <p className="text-red text-[24px] font-semibold">Sun *</p>
        <p className="text-textGray text-[14px]">Learning</p>
      </div>
    </div>
  );
};

export default Logo;
