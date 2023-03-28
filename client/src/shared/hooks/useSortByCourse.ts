import API from '@/src/apis';
import { useEffect, useState } from 'react';
import { type SelectOptionData } from '../components/Select';
import { type Course } from '../utils';

const useSortByCourse = (): any => {
  const [data, setData] = useState<Course[]>([]);

  const ASC = '1';

  const DESC = '2';

  const options: SelectOptionData[] = [
    { id: 1, text: 'Sort by Name Ascending' },
    { id: 2, text: 'Sort by Name Descending' }
  ];

  const [sortDirection, setSortDirection] = useState<typeof ASC | typeof DESC>(
    ASC
  );

  useEffect(() => {
    async function fetchdata (): Promise<void> {
      try {
        const response = await API.get<Course[]>(
          `course/?sort=${sortDirection === ASC ? 'title_asc' : 'title_desc'}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();
  });

  const handleSortDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSortDirection(event.target.value as typeof ASC | typeof DESC);
  };

  return {
    setData,
    data,
    handleSortDirectionChange,
    options,
    sortDirection
  };
};
export default useSortByCourse;
