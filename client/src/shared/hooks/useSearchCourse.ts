import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/src/apis';

export const useSearchCourse = (): any => {
  const router = useRouter();
  const { q } = router.query;

  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData (): Promise<void> {
      const response = await axiosInstance.get('/course/');
      if (!ignore) {
        setData(response.data);
      }
    }

    void fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleOnSearchEvent = (searchTerm: string): void => {
    void router.push(`/trainer/courses/list?q=${searchTerm}`);
  };

  let listOfCourses: string[] = data;
  if (q !== undefined) {
    listOfCourses = data.filter((course: any) => {
      return course.title.toLowerCase().includes(q as string);
    });
  }

  return {
    listOfCourses,
    handleOnSearchEvent
  };
};
