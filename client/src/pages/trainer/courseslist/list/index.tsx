/* eslint-disable @typescript-eslint/space-before-function-paren */
import { Fragment, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import GridIcon from '@/src/shared/icons/GridIcon';
import ListIcon from '@/src/shared/icons/ListIcon';
import ViewAs from '@/src/sections/courses/list/view-as';
import API from '@/src/apis';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import { type Course } from '@/src/shared/utils';
import useSortByCourse from '@/src/shared/hooks/useSortByCourse';
import Select from '@/src/shared/components/Select';

export interface TypeOfViewProps {
  typeOfView: string;
  listOfCourses: Course[];
}

export interface CourseProps {
  id: number;
  title: string;
  description: string;
  category_name: string;
  created_at: string;
}

const View = (): ReactNode => {
  const { setData, data, handleSortDirectionChange, options, sortDirection } =
    useSortByCourse();

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

  useEffect(() => {
    let ignore = false;
    async function fetchData(): Promise<void> {
      const response = await API.get('/course');
      if (!ignore) {
        setData(response.data);
      }
    }
    void fetchData();
    return () => {
      ignore = true;
    };
  }, [setData]);

  function handleOnSearchEvent(query: string): void {
    throw new Error('Function not implemented.');
  }

  const listOfCourses = data;

  return (
    <Fragment>
      <div className="flex flex-row">
        <div className="bg-white top-0 bottom-0 w-3/5 left-20 ml-28 pr-10">
          <div className="text-xl pl-5 pt-20 text-blue-500">Courses</div>
          <div className="pl-5 pt-10">
            <SearchBar onSearchEvent={handleOnSearchEvent} />
            <div className="pt-5 flex flex-row justify-between">
              <div className="">
                <Select
                  eventHandler={handleSortDirectionChange}
                  options={options}
                  value={sortDirection}
                />
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
              <ViewAs
                typeOfView={selectedView}
                listOfCourses={listOfCourses}
              ></ViewAs>
              (
              <div className="text-center text-2xl pt-20">No Courses Found</div>
              )
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default View;
