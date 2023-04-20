/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useRef, useState } from 'react';
import API from '@/src/apis';
import { useRouter } from 'next/router';
import { is404, isRequestOk, type User } from '../utils';

const useEnrollUser = (): any => {
  const router = useRouter();

  const fetchedUsersRef = useRef<User[]>([]);

  const [courseTitle, setCourseTitle] = useState('');

  const [pageNotFound, setPageNotFound] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [limiter, setLimiter] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [numberOfUsers, setNumberOfUsers] = useState(1000);

  const [listOfUser, setListOfUser] = useState<User[]>([]);

  const handleChangePageEvent = (page: number): void => {
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: page
      }
    });
    setCurrentPage(page);
  };

  const handleShowPerPage = (e: any): void => {
    const thisLimiter = e.target.value;
    setLimiter(thisLimiter);
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page_size: thisLimiter
      }
    });
  };

  const searchHandler = (searchTerm: string): void => {
    setSearchTerm(searchTerm);

    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        search: searchTerm
      }
    });
  };

  useEffect(() => {
    const queryParams: any = {};

    if (searchTerm !== '') {
      queryParams.search = searchTerm;
    }

    if (limiter !== 0) {
      queryParams.page_size = limiter;
    }

    if (currentPage !== 0) {
      queryParams.page = currentPage;
    }

    setListOfUser([]);

    const fetchCourse = async (): Promise<void> => {
      if (router.query.id !== undefined) {
        try {
          const result = await API.get(`course/${router.query.id}`);
          setCourseTitle(result.data.name);
          if (isRequestOk(result)) {
            const userResult = await API.get(`user/${result.data.company}`, {
              params: queryParams
            });
            if (isRequestOk(userResult)) {
              fetchedUsersRef.current = userResult.data.user;
              setNumberOfUsers(userResult.data.pagination.count);
              setListOfUser(userResult.data.user);
            }
          }
        } catch (error: any) {
          console.error(error);
          if (is404(error.response)) {
            setPageNotFound(true);
          }
        }
      }
    };
    void fetchCourse();
  }, [router.query.id, searchTerm, currentPage, limiter]);

  const showPerPageOption = [
    { id: 10, text: '10' },
    { id: 25, text: '25' },
    { id: 50, text: '50' },
    { id: fetchedUsersRef.current.length, text: `all (${fetchedUsersRef.current.length})` }
  ];

  const paths = [
    {
      text: 'Courses',
      url: '/trainer/courses/list'
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
    handleShowPerPage,
    showPerPageOption,
    pageNotFound,
    searchHandler,
    numberOfUsers,
    limiter,
    currentPage,
    handleChangePageEvent,
    listOfUser
  };
};

export default useEnrollUser;
