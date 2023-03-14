import React from 'react';
import type { FC } from 'react';
import Checkbox from '@/src/shared/components/Checkbox';
import Radiobutton from '@/src/shared/components/Radiobutton';

const RightSideContainer: FC = () => {
  return (
    <div className="top-0 bottom-0 right-20 bg-white w-80 mr-12 ml-6">
      <div className="pt-20 text-xl font-bold">Course Status</div>
      <hr className="bg-gray-500"></hr>
      <Radiobutton
        options={['Option1', 'Option 2', 'Option 3']}
        onClickEvent={() => {}}
      ></Radiobutton>
      <br />
      <div className="text-xl font-bold">Category</div>
      <hr className="bg-gray-500"></hr>
      <Checkbox
        options={['Option1', 'Option 2', 'Option 3']}
        onClickEvent={() => {}}
      ></Checkbox>
    </div>
  );
};

export default RightSideContainer;
