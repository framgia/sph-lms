/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/promise-function-async */

import React, { useState, useEffect } from 'react';
import api from '../../api';
export interface CourseProps {
  id: number;
  title: string;
  course_category: number;
}

const TestAPI: React.FunctionComponent = () => {
  const [course, setCourse] = useState<CourseProps[]>([]);

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

  console.log(course);

  return (
    <div className="container border mx-auto">
    </div>
  );
};

export default TestAPI;
