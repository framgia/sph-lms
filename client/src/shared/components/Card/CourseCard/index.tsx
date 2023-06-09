import type { DBCourse } from '@/src/shared/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  course: DBCourse;
}

const CourseCard: React.FC<Props> = ({ course }: Props) => {
  return (
    <div className="w-[268px] rounded-lg group border border-gray-300 shadow-[2.0px_2.0px_7.0px_rgba(0,0,0,0.1)]">
      <Link href={`/trainer/courses/${course.id}`}>
        <div className="relative overflow-hidden">
          <Image
            className="w-full h-[128px] rounded-tl-lg rounded-tr-lg object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
            src={course.image ?? '/image1.jpg'}
            alt={course.name}
            width={720}
            height={128}
          />
        </div>
        <div className="p-3">
          <div className="text-lg font-semibold">{course.name}</div>
          <div className="text-xs text-gray-400 mb-3">
            {course.description ?? 'No description to show'}
          </div>
          <div className="text-sm font-semibold mb-1">Categories:</div>
          <div className="relative flex justify-between">
            {course?.category?.map((category, index) => (
              <span
                className="text-xs font-semibold text-gray-400 border-2 border-gray-400 px-2 py-1 my-1 rounded-full transition-color duration-300 hover:bg-gray-50"
                key={index}
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
