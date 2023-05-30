import React from 'react';
import Sidebar from '@/src/shared/layouts/LayoutLearning/Sidebar';
import ArrowIcon from '../../icons/ArrowIcon';

interface Props {
  children: React.ReactNode;
}

const LayoutLearning: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar> </Sidebar>
      <div className="bg-blue flex-1  text-black text-sm border-1 border-dashed ">
        <div className="h-24 bg-gray-100 pt-0 ">
          <div className="b-4">
            <div className="justify-center flex flex-row pt-8 ">
              <div className="p-2">
                <ArrowIcon />
              </div>
              <div className="  text-blue-600 text-2xl font-bold">Assessment 1</div>
              <div className="p-2">
                <ArrowIcon className="rotate-180" />
              </div>
            </div>
            <div className="text-center text-gray-500">Module 3/381</div>
          </div>
        </div>
        <div className="px-10 pt-4 flex justify-end">
          <div className="w-24  pl-100 h-6 bg-white  rounded-md text-center">toggle switch</div>
        </div>
        <div className="pt-20 pl-32 pb-1 font-bold">Assessment Overview</div>
        <div className="pl-32 px-32">
          <div className="justify-center flex flex-row p-6 bg-gray-100 h-28 w-100 space-x-10 align-bottom">
            <div className="pl-4 flex flex-col ">
              <div className="text-center text-xl"> 1</div>
              <div className=""> Questions</div>
            </div>
            <div className="pl-4 flex flex-col">
              <div className="text-center text-xl"> 00:00</div>
              <div className=""> Time Limit</div>
            </div>
            <div className="pl-4 flex flex-col">
              <div className="text-center text-xl"> 00:00</div>
              <div className=""> Max Attempts</div>
            </div>
            <div className="pl-4 flex flex-col">
              <div className="text-center text-xl">N/A</div>
              <div className=""> Passing Grade</div>
            </div>
            <div className="pl-4 flex flex-col ">
              <div className="text-center text-xl"> N/A</div>
              <div className=""> Time Betweeen Attempts</div>
            </div>
            <div className="pl-4 pt-2 ">
              <div className=" w-40 p-2 h-10  bg-gray-300 rounded-md text-center">
                Continue Assesment
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 pl-32 font-bold">My Historical Attempts</div>
        <div className="pl-32 px-32 pt-1">
          <div className="bg-gray-300 h-40 w-100 text-black"></div>
        </div>
      </div>
    </div>
  );
};

export default LayoutLearning;
