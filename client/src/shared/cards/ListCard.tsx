import { Fragment } from 'react';
import type { FC } from 'react';
import Image from 'next/image';

export interface ListCardProps {
  courseTitle: string;
  imageSource: string;
  category: string;
}

const ListCard: FC<ListCardProps> = ({ courseTitle, imageSource, category }: ListCardProps) => {
  return (
    <Fragment>
      <div className=" flex flex-row h-36 w-auto bg-white drop-shadow-lg space-x-20 ">
        <div className="p-4">
          <div className="flex justify-center h-28 w-64 border-2 border-lightGray ">
            <Image
              src={imageSource}
              alt=""
              width={150}
              height={150}
              className="justify-center"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-2xl hover:underline pt-4 font-semibold break-normal inline-block">
            {courseTitle}
          </div>
          <div className="flex flex-col space-y-2 pb-4">
            <div className="flex-wrap">
              <div className="inline-block bg-blueGray text-lightBlue rounded-lg  pl-2 pr-2">
                {category}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListCard;
