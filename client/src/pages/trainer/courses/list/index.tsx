import { Fragment, useState } from 'react';
import type { ReactNode } from 'react';
import Dropdown from '@/src/shared/components/Dropdown';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import GridIcon from '@/src/shared/icons/GridIcon';
import ListIcon from '@/src/shared/icons/ListIcon';
import ViewAs from '@/src/sections/courses/list/view-as';
import { useSearchCourse } from '@/src/shared/hooks/useSearchCourse';

const View = (): ReactNode => {
  const [selectedView, setSelectedView] = useState('grid');
  const [gridIconColor, setGridIconColor] = useState('stroke-blue-500');
  const [listIconColor, setListIconColor] = useState('');

  const handleView = (view: string): void => {
    setSelectedView(view);
    if (view === 'grid') {
      setGridIconColor('stroke-blue-500');
      setListIconColor('');
    } else {
      setListIconColor('stroke-blue-500');
      setGridIconColor('');
    }
  };

  const { courses, handleOnSearchEvent } = useSearchCourse();

  return (
    <Fragment>
      <div className="flex flex-row">
        <div className="bg-white top-0 bottom-0 w-3/5 left-20 ml-28 pr-10">
          <div className="text-xl pl-5 pt-20 text-blue-500">Courses</div>
          <div className="pl-5 pt-10">
            <SearchBar onSearchEvent={handleOnSearchEvent} />
            <div className="pt-5 flex flex-row justify-between">
              <div className="">
                <Dropdown
                  label="Sort by Name Ascending"
                  options={[
                    { text: 'Option 1', url: '' },
                    { text: 'Option 2', url: '' }
                  ]}
                  classNames="border-solid border-gray-300"
                ></Dropdown>
              </div>
              <div className="flex flex-row space-x-3 pr-3">
                <div
                  onClick={() => {
                    handleView('list');
                  }}
                  className="flex justify-end cursor-pointer"
                >
                  <ListIcon
                    height={25}
                    width={25}
                    classname={listIconColor}
                  ></ListIcon>
                </div>
                <div
                  className="flex justify-end cursor-pointer"
                  onClick={() => {
                    handleView('grid');
                  }}
                >
                  <GridIcon
                    height={25}
                    width={25}
                    classname={gridIconColor}
                  ></GridIcon>
                </div>
              </div>
            </div>
            <div className="z-10 pt-4 h-96">
              {courses.length > 0
                ? (
                <ViewAs typeOfView={selectedView} courses={courses}></ViewAs>
                  )
                : (
                <div className="text-center text-2xl pt-20">
                  No Courses Found
                </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default View;
