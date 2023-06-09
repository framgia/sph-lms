import type { LearningPath } from '@/src/shared/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  learningPath: LearningPath;
}

const LearningPathCard: React.FC<Props> = ({ learningPath }: Props) => {
  const { id, name, image, course_count: courseCount, category } = learningPath;

  return (
    <div className="w-[268px] rounded-md border shadow-[2px_2px_4px_0_rgba(0, 0, 0, 0.05)]">
      <Link href={`/trainer/learning-paths/${id}`}>
        <div className="relative overflow-hidden group">
          <Image
            className="w-full h-32 rounded-tl-md rounded-tr-md object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
            src={image ?? '/image1.jpg'}
            alt={name}
            width={720}
            height={128}
          />
        </div>
        <div className="flex flex-col gap-[21px] p-4">
          <div>
            <div className="font-medium text-dark truncate" title={learningPath.name}>{learningPath.name}</div>
            <div className="text-xs text-gray-400">{`${courseCount} ${
              courseCount > 1 ? 'courses' : 'course'
            }`}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm font-normal">Categories:</div>
            <div className="flex flex-wrap gap-1">
              {category?.map((category) => (
                <span
                  className="text-xs font-semibold text-gray-400 border border-gray-400 px-2 py-1 rounded-full transition-color duration-300 hover:bg-gray-50"
                  key={category.id}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LearningPathCard;
