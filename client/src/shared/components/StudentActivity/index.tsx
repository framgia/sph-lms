import React, { Fragment } from 'react';
import Avatar from '../Avatar';
import ProgressPercentage from '../ProgressPercentage';
import ThreeDotsIcon from '../../icons/ThreeDotsIcon';
import { type User } from '../../utils';

interface StudentActivityProps {
  trainee: User;
}

const StudentActivity: React.FC<StudentActivityProps> = ({ trainee }) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { first_name, last_name, email, image, course } = trainee;

  return (
    <div className="flex divide-x">
      <div className="flex gap-1 p-4 w-[250px]">
        <Avatar src={image} />
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {first_name} {last_name}
          </span>
          <span className="text-sm text-neutral-disabled">{email}</span>
        </div>
      </div>
      <div className="flex flex-1 gap-4 p-4 items-center">
        {course ? (
          <Fragment>
            <span className="font-medium text-xs">{course.name}</span>
            <div className="flex-1">
              <ProgressPercentage progress={course.percentage} />
            </div>
          </Fragment>
        ) : (
          <span className="font-medium text-xs">No learning material yet</span>
        )}
      </div>
      <div className="flex items-center p-4">
        <ThreeDotsIcon />
      </div>
    </div>
  );
};

export default StudentActivity;
