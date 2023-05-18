import type { HTMLAttributes, FC } from 'react';

interface ProgressBarProps extends HTMLAttributes<HTMLProgressElement> {
  value: number;
  showProgress?: boolean;
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({
  value,
  className = '',
  showProgress = false,
  ...rest
}) => {
  return (
    <div className="flex items-center space-x-1">
      {showProgress && <p className="text-textGray/50 font-semibold">{value.toFixed()}%</p>}
      <div className="flex rounded-lg overflow-hidden flex-grow">
        <progress className={`w-full ${className}`} max="100" value={value} {...rest} />
      </div>
    </div>
  );
};

export default ProgressBar;
