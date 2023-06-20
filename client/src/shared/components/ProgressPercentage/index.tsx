import React, { Fragment } from 'react';

interface ProgressPercentageProps {
  progress?: number | null;
}

const ProgressPercentage: React.FC<ProgressPercentageProps> = ({ progress }) => {
  return (
    <Fragment>
      <div className="relative w-full flex items-center justify-between">
        <div className="text-xs font-bold text-gray-400 pr-2">{progress}%</div>
        <div className="w-full bg-gray-300 rounded-full">
          <div className="h-2 bg-lightGreen rounded-xl" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProgressPercentage;
