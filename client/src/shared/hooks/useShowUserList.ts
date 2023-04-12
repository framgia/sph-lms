/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import API from '@/src/apis';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { UserList } from '@/src/shared/utils';

const useShowUserList = (): any => {
  const router = useRouter();
  const params = router.query;
  const [listOfUser, setListOfUser] = useState<UserList[]>([]);
  const numberOfUsers = listOfUser.length;
  const [limiter, setLimiter] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPerPage, setShowPerPage] = useState<UserList[]>([]);
  const [startingIndex, setStartingIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePageEvent = (page: number): void => {
    async function fetchdata (): Promise<void> {
      try {
        const response = await API.get(
          `user/${params.company_id}?page_size=${limiter}&page=${page}&search=${searchTerm}`
        );
        setShowPerPage(response.data.user);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();
    console.log(showPerPage);
    setCurrentPage(page);
    setStartingIndex(limiter * page - limiter + 1);
    setLastIndex(limiter * page);
  };
  const handleShowPerPage = (e: any): void => {
    const fetchdata = async (): Promise<void> => {
      try {
        const response = await API.get(
          `user/${params.company_id}?page_size=${e.target.value}&page=${1}&search=${searchTerm}`
        );
        setShowPerPage(response.data.user);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchdata();
    const limiter = e.target.value;
    setLimiter(limiter);
    setStartingIndex(limiter * currentPage - limiter + 1);
    setLastIndex(limiter * currentPage);
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
    async function fetchdata (): Promise<void> {
      try {
        const response = await API.get(`user/${params.company_id}?search=${searchTerm}`);
        setListOfUser(response.data.user);
        setShowPerPage(response.data.user.slice(0, limiter));
        setStartingIndex(1);
        setLastIndex(limiter);
        console.log(showPerPage);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();
  }, [params]);

  const showPerPageOption = [
    { id: 10, text: '10' },
    { id: 25, text: '25' },
    { id: 50, text: '50' },
    { id: listOfUser.length, text: `all (${listOfUser.length})` }
  ];

  return {
    listOfUser,
    showPerPageOption,
    handleChangePageEvent,
    handleShowPerPage,
    showPerPage,
    currentPage,
    lastIndex,
    startingIndex,
    numberOfUsers,
    limiter,
    searchHandler
  };
};
export default useShowUserList;
