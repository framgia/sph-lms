/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import API from '@/src/apis';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isRequestOk, type CourseDetails, type UserDetails } from '../utils';

export const useShowPerPage = (): any => {
  const router = useRouter();
  const params = router.query;

  const [users, setUsers] = useState<UserDetails[]>([]);

  const [course, setCourse] = useState<CourseDetails>({
    id: '',
    title: 'Current Course',
    description: '',
    image: '',
    url: '',
    createdAt: '',
    updatedAt: ''
  });

  const [showPerPage, setShowPerPage] = useState<UserDetails[]>([]);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const result = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        if (isRequestOk(result)) {
          setUsers(result.data);
        }
      } catch (error) {
        console.error(error);
        alert('something went wrong');
      }
    };

    const fetchCourse = async (): Promise<void> => {
      if (params.id !== undefined) {
        try {
          const result = await API.get(`course/${params.id}`);
          if (isRequestOk(result)) {
            setCourse(result.data);
          }
        } catch (error) {
          console.error(error);
          alert('something went wrong');
        }
      }
    };

    void fetchUsers();
    void fetchCourse();
    setShowPerPage(users.slice(0, 10));
  }, [params]);

  const handleShowPerPage = (e: any): void => {
    const limiter = e.target.value;
    setShowPerPage(users.slice(0, limiter));
  };

  const paths = [
    {
      text: 'Courses',
      url: '/trainer/course'
    },
    {
      text: course.title,
      url: `/trainer/course/detail/${params.id}`
    },
    {
      text: 'Enroll User',
      url: router.asPath
    }
  ];

  const showPerPageOption = [
    { id: 10, text: '10' },
    { id: 25, text: '25' },
    { id: 50, text: '50' },
    { id: users.length, text: `all (${users.length})` }
  ];

  return { paths, showPerPage, showPerPageOption, handleShowPerPage };
};
