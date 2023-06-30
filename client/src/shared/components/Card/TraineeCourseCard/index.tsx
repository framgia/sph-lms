import React from 'react';
import Image from 'next/image';
import ProgressPercentage from '../../ProgressPercentage';
import type { CourseCollection } from '@/src/shared/utils';

interface Props {
  course: CourseCollection;
}

const TraineeCourseCard: React.FC<Props> = ({ course }: Props) => {
  return (
    <div className="flex pb-4 border-b border-neutral-200">
      <Image
        src={course.image ? course.image : '/image1.jpg'}
        alt="course"
        width={200}
        height={140}
        className="object-cover"
      />
      <div className="flex justify-between flex-1">
        <div className="text-dark flex flex-col gap-1 p-4 w-full">
          <h3 className="font-bold text-base">{course.name}</h3>
          <p className="text-xs line-clamp-3">{course.description}</p>
          <div className="mt-auto">
            <ProgressPercentage progress={course.progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeCourseCard;
