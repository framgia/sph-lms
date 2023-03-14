import type { FC } from 'react';
import Image from 'next/image';

export interface TypeOfViewProps {
  typeOfView: string;
  data: string[];
}

const ViewAs: FC<TypeOfViewProps> = ({ typeOfView, data }: TypeOfViewProps) => {
  return (
    <>
      {typeOfView === 'grid'
        ? (
        <div className="grid grid-cols-3 ">
          {data.map((data, index) => (
            <div key={index} className="m-3 o">
              <div className="">
                <div className="h-56  bg-white flex flex-col drop-shadow-lg">
                  <div className=" flex justify-center items-center">
                    <Image
                      src="/image1.jpg"
                      alt=""
                      height={150}
                      width={180}
                      className="justify-center"
                    ></Image>
                  </div>
                  <div className=" flex justify-center text-xl pt-2">
                    Title
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 bg-gray-300 rounded-lg mx-2">General</div>
                    <div className="w-28 bg-gray-300 rounded-lg mx-2">
                      03-01-2023
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          )
        : (
        <div className="flex flex-col ">
          {data.map((sadatample, index) => (
            <div key={index} className="m-3">
              <div className=" flex flex-row h-32 w-auto bg-white drop-shadow-lg space-x-20">
                <div className="flex items-center pl-20">
                  <Image
                    src="/image1.jpg"
                    alt=""
                    width={150}
                    height={150}
                    className="justify-center"
                  ></Image>
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="text-xl pt-3">Title</div>
                  <div className="flex flex-col space-y-2 ">
                    <div className="bg-gray-300 rounded-lg flex justify-center">
                      General
                    </div>
                    <div className="bg-gray-300 rounded-lg flex justify-center">
                      03-01-2023
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          )}
    </>
  );
};

export default ViewAs;
