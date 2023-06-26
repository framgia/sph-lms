import Image from 'next/image';
import ProgressPercentage from '../../ProgressPercentage';
import ChevronRight from '@/src/shared/icons/ChevronRightIcon';

const TraineeCourseCard = (): JSX.Element => {
  return (
    <div className="flex pb-4 border-b border-neutral-200">
      <Image src={'/image1.jpg'} alt="course" width={200} height={140} className="object-cover" />
      <div className="flex justify-between flex-1">
        <div className="text-dark flex flex-col gap-1 p-4">
          <h3 className="font-bold text-base">Course Title</h3>
          <p className="text-xs line-clamp-3">
            Lorem ipsum dolor sit amet consectetur. Amet neque eu tempus volutpat tempor lobortis
            ultrices. Lorem ipsum dolor sit amet consectetur. Amet neque eu tempus volutpat tempor
            lobortis ultrices. Lorem ipsum dolor sit amet consectetur. Amet neque eu tempus volutpat tempor
            lobortis ultrices.
          </p>
          <div className="mt-auto">
            <ProgressPercentage progress={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeCourseCard;
