import React, { useEffect, useState } from 'react';
import api from '@/src/apis';

import { LeftSideBar } from '@/src/shared/layouts/RightSideBar/LeftSideContainer';
import Select, { type SelectOptionData } from '@/src/shared/components/Select';

export interface CourseProps {
  id: number;
  title: string;
  course_category: number;
}

const options: SelectOptionData[] = [
  { id: 1, text: 'Sort by Name Ascending' },
  { id: 2, text: 'Sort by Name Descending' }
];

const CoursePage: React.FunctionComponent = () => {
  const ASC = '1';

  const DESC = '2';

  const [course, setCourse] = useState<CourseProps[]>([]);

  const [sortDirection, setSortDirection] = useState<typeof ASC | typeof DESC>(
    ASC
  );

  useEffect(() => {
    async function fetchdata (): Promise<void> {
      try {
        const response = await api.get<CourseProps[]>('course');
        setCourse(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();
  }, []);

  course.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    const pattern = /(\d+)|(\D+)/g;
    const partsA = titleA.match(pattern) ?? [];
    const partsB = titleB.match(pattern) ?? [];
    const length = Math.max(partsA.length, partsB.length);
    for (let i = 0; i < length; i++) {
      const partA = partsA[i] ?? '';
      const partB = partsB[i] ?? '';
      const isNumberA = /^\d+$/.test(partA);
      const isNumberB = /^\d+$/.test(partB);
      if (isNumberA && isNumberB) {
        const numA = parseInt(partA, 10);
        const numB = parseInt(partB, 10);
        if (numA < numB) return sortDirection === ASC ? -1 : 1;
        if (numA > numB) return sortDirection === ASC ? 1 : -1;
      } else {
        if (partA < partB) return sortDirection === ASC ? -1 : 1;
        if (partA > partB) return sortDirection === ASC ? 1 : -1;
      }
    }
    return 0;
  });

  const handleSortDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSortDirection(event.target.value as typeof ASC | typeof DESC);
    console.log(sortDirection);
  };

  const renderCourse = course.map((item) => (
    <div
      className="border-2 space-y-5 border-slate-800 grid pl-4"
      key={item.id}
    >
      <div className="pt-1.5">
        <h1 className="font-semibold text-lg">{item.title}</h1>
      </div>
      <div>
        <p>Category: {item.course_category}</p>
      </div>
      <div className="place-self-end pb-2 pr-4">
        <button
          type="button"
          className="py-2 w-24 bg-blue-400 w-16 rounded text-white-50 font-normal hover:bg-blue-700 text-white"
        >
          Start
        </button>
      </div>
    </div>
  ));

  return (
    <LeftSideBar>
      <div className="pt-44 pb-5">
        <Select
          eventHandler={handleSortDirectionChange}
          options={options}
          value={sortDirection}
        />
      </div>
      <div className="grid grid-cols-3 gap-8">{renderCourse}</div>
    </LeftSideBar>
  );
};

export default CoursePage;
