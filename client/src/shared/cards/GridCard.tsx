import { Fragment } from 'react';
import type { FC } from 'react';
import Image from 'next/image';

export interface GridCardProps {
  courseTitle: string;
  imageSource: string;
  category: string;
}

const GridCard: FC<GridCardProps> = ({ courseTitle, imageSource, category }: GridCardProps) => {
  return (
    <Fragment>
      <div className=" bg-white flex flex-col ">
        <div className="h-44 flex justify-center border-2 border-lightGray">
          <Image
            src={imageSource}
            alt=""
            height={200}
            width={200}
            className="justify-center"
          ></Image>
        </div>
        <div className="flex flex-col justify-between h-36">
          <div className="hover:underline pt-2 mx-8 text-2xl h-auto w-56 font-semibold break-normal">
            {courseTitle}
          </div>
          <div className="space-y-2 pb-4">
            <div className="inline-block bg-blueGray rounded-lg mx-8 text-lightBlue pl-2 pr-2">
              {category}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GridCard;
