import Image from 'next/image';
import React from 'react';

interface Props {
  imgPath: string;
  courseTitle: string;
  lessonsCount: number;
}

const LearningPathCourseCard = ({ imgPath, courseTitle, lessonsCount }: Props): JSX.Element => {
  return (
    <div className="flex w-fit min-w-[420px] overflow-hidden bg-white border rounded-[5px] border-neutral-100">
      <Image src={imgPath} width={150} height={150} alt={courseTitle} />
      <div className="w-full p-4 flex flex-col gap-2">
        <h3>{courseTitle}</h3>
        <div className="flex flex-col text-xs">
          <span className="text-disabled">{lessonsCount} {lessonsCount === 1 ? 'lesson' : 'lessons'} available</span>
        </div>
      </div>
    </div>
  );
};

export default LearningPathCourseCard;
