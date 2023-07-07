import type { Course } from '@/src/shared/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';

interface Props {
  course: Course;
  hasButton?: boolean;
  onPreviewClick?: () => void;
  isSelected?: boolean;
}

const LearningPathCourseCard = ({
  course,
  hasButton,
  isSelected,
  onPreviewClick,
}: Props): JSX.Element => {
  const lessonCount = course.lessons?.length ?? 0;

  const CourseContent = (): JSX.Element => {
    return (
      <div
        className={`flex w-[420px] min-h-[128px] overflow-hidden bg-white border rounded-[5px] shadow-[2.0px_2.0px_4.0px_rgba(0,0,0,0.05)] ${
          isSelected ? 'border-neutral-900' : 'border-neutral-100'
        }`}
      >
        <Image
          src={course.image ?? '/image1.jpg'}
          width={150}
          height={150}
          alt={course.name}
          className="object-cover"
        />
        <div className="w-full relative p-4 flex flex-col gap-2">
          <h3 className="line-clamp-2" title={course.name}>
            {course.name}
          </h3>
          <div className="flex flex-col text-xs pb-2">
            <span className="text-disabled">
              {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'} available
            </span>
          </div>
          {hasButton && (
            <button
              onClick={onPreviewClick}
              className="w-[78px] h-[28px] rounded-md mt-2 text-xs font-[150] border border-dark"
            >
              Preview
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {hasButton ? (
        <CourseContent />
      ) : (
        <Link href={`/trainer/courses/${course.id}`}>
          <CourseContent />
        </Link>
      )}
    </Fragment>
  );
};

export default LearningPathCourseCard;
