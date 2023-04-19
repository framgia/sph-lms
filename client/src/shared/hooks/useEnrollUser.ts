/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useRef, useState } from 'react';

import API from '@/src/apis';
import { useRouter } from 'next/router';
import { is404, isRequestOk, type User } from '../utils';

const useEnrollUser = (): any => {
  const router = useRouter();

  const [showPerPage, setShowPerPage] = useState<User[]>([]);

  const fetchedUsersRef = useRef<User[]>([]);

  const [courseTitle, setCourseTitle] = useState('');

  const [pageNotFound, setPageNotFound] = useState(false);

  useEffect(() => {
    const fetchCourse = async (): Promise<void> => {
      if (router.query.id !== undefined) {
        try {
          const result = await API.get(`course/${router.query.id}`);
          setCourseTitle(result.data.name);
          if (isRequestOk(result)) {
            const userResult = await API.get(`user/${result.data.company}`);
            if (isRequestOk(userResult)) {
              fetchedUsersRef.current = userResult.data.user;
              setShowPerPage(fetchedUsersRef.current.slice(0, 10));
            }
          }
        } catch (error: any) {
          console.error(error);
          /* alert('something went wrong'); */
          if (is404(error.response)) {
            setPageNotFound(true);
          }
        }
      }
    };
    void fetchCourse();
  }, [router.query.id]);

  const handleShowPerPage = (e: any): void => {
    const limiter = e.target.value;
    setShowPerPage(fetchedUsersRef.current.slice(0, limiter));
  };

  const showPerPageOption = [
    { id: 10, text: '10' },
    { id: 25, text: '25' },
    { id: 50, text: '50' },
    { id: fetchedUsersRef.current.length, text: `all (${fetchedUsersRef.current.length})` }
  ];

  const paths = [
    {
      text: 'Courses',
      url: '/trainer/course'
    },
    {
      text: courseTitle,
      url: `/trainer/course/detail/${router.query.id}`
    },
    {
      text: 'Enroll User',
      url: router.asPath
    }
  ];

  return {
    paths,
    courseTitle,
    showPerPage,
    handleShowPerPage,
    showPerPageOption,
    pageNotFound
  };
};

export default useEnrollUser;
