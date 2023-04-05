/* eslint-disable @typescript-eslint/restrict-template-expressions */
import API from '@/src/apis';
import { useEffect, useState } from 'react';
import { getUserToken } from '@/src/shared/utils';
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

  const handleChangePageEvent = (page: number): void => {
    async function fetchdata (): Promise<void> {
      try {
        const token = getUserToken();
        const headers = { Authorization: `Token ${token}` };
        const response = await API.get(
          `user/${params.company_id}?page_size=${limiter}&page=${page}`,
          {
            headers
          }
        );
        setShowPerPage(response.data.user);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();
    setCurrentPage(page);
    setStartingIndex(limiter * page - limiter + 1);
    setLastIndex(limiter * page);
  };
  const handleShowPerPage = async (e: any): Promise<void> => {
    async function fetchdata (): Promise<void> {
      try {
        const token = getUserToken();
        const headers = { Authorization: `Token ${token}` };
        const response = await API.get(
          `user/${params.company_id}?page_size=${e.target.value}&page=${currentPage}`,
          {
            headers
          }
        );
        setShowPerPage(response.data.user);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();

    const limiter = e.target.value;
    setLimiter(limiter);
    setStartingIndex(limiter * currentPage - limiter + 1);
    setLastIndex(limiter * currentPage);
  };
  useEffect(() => {
    async function fetchdata (): Promise<void> {
      try {
        const token = getUserToken();
        const headers = { Authorization: `Token ${token}` };
        const response = await API.get(`user/${params.company_id}`, {
          headers
        });
        setListOfUser(response.data.user);
        setShowPerPage(response.data.user.slice(0, limiter));
        setStartingIndex(1);
        setLastIndex(limiter);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();
  }, [params, limiter]);

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
    limiter
  };
};
export default useShowUserList;
