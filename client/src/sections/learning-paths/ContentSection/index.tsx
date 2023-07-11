import Button from '@/src/shared/components/Button';
import LearningPathCourseCard from '@/src/shared/components/Card/LearningPathCourseCard';
import type { Course, LearningPath } from '@/src/shared/utils';
import Link from 'next/link';
import React, { Fragment, useState, type FC } from 'react';

interface LearningPathContentSectionProp {
  learningPath: LearningPath;
}

const LearningPathContentSection: FC<LearningPathContentSectionProp> = ({
  learningPath,
}): JSX.Element => {
  const [selectedCourse, setSelectedCourse] = useState(learningPath.courses[0] || null);

  const handlePreview = (course: Course): void => {
    setSelectedCourse(course);
  };
  return (
    <Fragment>
      <div>
        <h3 className="text-lg font-bold text-dark mb-2">Description</h3>
        <p className="text-sm font-normal text-dark">{learningPath?.description}</p>
      </div>
      <div className="flex gap-6 mt-4 mb-4">
        <div className="grid gap-4">
          {learningPath.courses.length === 0 ? (
            <p className="text-sm font-semibold text-dark pt-4 ">No courses available.</p>
          ) : (
            learningPath.courses.map((course, index) => (
              <div key={course.id} className="flex flex-col items-center">
                <LearningPathCourseCard
                  course={course}
                  hasButton={true}
                  isSelected={selectedCourse.id === course.id}
                  onPreviewClick={() => {
                    handlePreview(course);
                  }}
                />
              </div>
            ))
          )}
        </div>
        <div className="flex-1 gap-[10px]">
          {selectedCourse && (
            <div className="grid gap-4 border border-neutral-900 p-4 rounded-md">
              <div>
                <h3 className="text-base font-[600] text-dark mb-2">{selectedCourse.name}</h3>
                <p className="text-xs font-normal text-disabled">{selectedCourse.description}</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-sm font-[600] text-dark mb-2">Course Overview</h3>
                <div>
                  {selectedCourse.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-neutral-50 px-4 py-2 text-sm font-[500] text-lightGray3 text-opacity-50"
                    >
                      {lesson.title}
                    </div>
                  ))}
                </div>
              </div>
              <Link href={`/trainer/courses/${selectedCourse.id}`}>
                <Button
                  text="Go to course details"
                  buttonClass="rounded-md h-[28px] px-4 text-red text-xs font-[600] border border-red"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default LearningPathContentSection;
