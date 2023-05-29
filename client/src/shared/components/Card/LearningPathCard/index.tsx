import type { LearningPath } from '@/src/shared/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  learningPath: LearningPath;
}

const LearningPathCard: React.FC<Props> = ({ learningPath }: Props) => {
  return (
    <div className="w-[268px] rounded-md border shadow-[2px_2px_4px_0_rgba(0, 0, 0, 0.05)]">
      <Link href={`/trainer/learning-paths/${learningPath.id}`}>
        <div className="relative overflow-hidden group">
          <Image
            className="w-full h-32 rounded-tl-md rounded-tr-md object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
            src={learningPath.image}
            alt={learningPath.name}
            width={720}
            height={128}
          />
        </div>
        <div className="flex flex-col gap-[21px] p-4">
          <div>
            <div className="text-lg font-semibold">{learningPath.name}</div>
            <div className="text-xs text-gray-400">{`${learningPath.courses.length} ${
              learningPath.courses.length > 1 ? 'courses' : 'course'
            }`}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm font-normal">Categories:</div>
            <div className="flex flex-start gap-1">
              {learningPath.categories.map((category) => (
                <span
                  className="text-xs font-normal text-disabled border border-disabled px-2 py-1 rounded-full transition-color duration-300 hover:bg-gray-50"
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
