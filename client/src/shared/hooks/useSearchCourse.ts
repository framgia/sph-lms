import { useState, useEffect } from 'react';
import API from '@/src/apis';
import type { Course } from '../utils/interface';

export const useSearchCourse = (): any => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData (): Promise<void> {
      const result = await API.get('/course/');
      if (!ignore) {
        setCourses(result.data);
      }
    }

    void fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleOnSearchEvent = async (searchTerm: string): Promise<void> => {
    try {
      const result = await API.get(`/course/?title=${searchTerm}`);
      setCourses(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    courses,
    handleOnSearchEvent
  };
};
