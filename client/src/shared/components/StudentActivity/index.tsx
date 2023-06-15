import React from 'react';
import Avatar from '../Avatar';
import ProgressPercentage from '../ProgressPercentage';
import ThreeDotsIcon from '../../icons/ThreeDotsIcon';

const StudentActivity = (): JSX.Element => {
  return (
    <div className="flex divide-x">
      <div className="flex gap-1 p-4">
        <Avatar />
        <div className="flex flex-col">
          <span className="text-sm font-medium">John Jonathan Doe</span>
          <span className="text-sm text-neutral-disabled">john@gmail.com</span>
        </div>
      </div>
      <div className="flex flex-1 gap-4 p-4 items-center">
        <span className="font-medium text-xs">Vue Course 101 - Vue JS Mastery</span>
        <div className="flex-1">
          <ProgressPercentage progress={60} />
        </div>
      </div>
      <div className="flex items-center p-4">
        <ThreeDotsIcon />
      </div>
    </div>
  );
};

export default StudentActivity;
