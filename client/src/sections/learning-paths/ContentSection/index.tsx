import LearningPathCourseCard from '@/src/shared/components/Card/LearningPathCourseCard';
import ChevronDown from '@/src/shared/icons/ChevronDownIcon';
import type { LearningPath } from '@/src/shared/utils';
import React, { type FC } from 'react';

interface LearningPathContentSectionProp {
  learningPath: LearningPath;
}

const LearningPathContentSection: FC<LearningPathContentSectionProp> = ({
  learningPath,
}): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 mb-16">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-dark font-medium">Description:</span>
        <p className="text-sm">{learningPath?.description}</p>
      </div>
      <div>
        {learningPath?.courses.map((course, index) => (
          <div key={course.id} className="flex flex-col items-center">
            <LearningPathCourseCard course={course} />
            {learningPath?.courses.length - 1 !== index && <ChevronDown height={40} width={40} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathContentSection;
