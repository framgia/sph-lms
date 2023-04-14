/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable object-shorthand */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import API from '@/src/apis';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { type UserList, isRequestOk, alertError } from '@/src/shared/utils';

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
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState(true);

  const handleChangePageEvent = (page: number): void => {
    const fetchdata = async (): Promise<void> => {
      try {
        const response = await API.get(
          `user/${
            params.company_id
          }?page_size=${limiter}&page=${page}&search=${searchTerm}&sort_by=${sortBy}&sort_order=${
            sortOrder ? 'asc' : 'desc'
          }`
        );
        setShowPerPage(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchdata();
    setCurrentPage(page);
    setStartingIndex(limiter * page - limiter + 1);
    setLastIndex(limiter * page);
  };

  const handleShowPerPage = (e: any): void => {
    const fetchdata = async (): Promise<void> => {
      try {
        const response = await API.get(
          `user/${params.company_id}?page_size=${
            e.target.value
          }&page=${1}&search=${searchTerm}`
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
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page_size: limiter
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

  const handleSortBy = (attribute: string): void => {
    const newSortOrder = sortBy === attribute ? !sortOrder : true;
    setSortBy(attribute);
    setSortOrder(newSortOrder);

    const fetchUsers = async (): Promise<void> => {
      try {
        const result = await API.get(
          `/user/${params.company_id}?sort_by=${sortBy}&sort_order=${
            newSortOrder ? 'asc' : 'desc'
          }&page_size=${limiter}`
        );
        if (isRequestOk(result)) {
          setShowPerPage(result.data.user);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error(error);
        alertError('something went wrong');
      }
    };

    void fetchUsers();
  };

  useEffect(() => {
    const fetchdata = async (): Promise<void> => {
      try {
        const response = await API.get(
          `user/${params.company_id}?search=${searchTerm}`
        );
        setListOfUser(response.data.user);
        setShowPerPage(response.data.user.slice(0, limiter));
        setStartingIndex(1);
        setLastIndex(limiter);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchdata();
  }, [params]);

  const showPerPageOption = [
    { id: 10, text: '10' },
    { id: 25, text: '25' },
    { id: 50, text: '50' },
    { id: listOfUser.length, text: `all (${listOfUser.length})` }
  ];

  const tableHeader = [
    { text: 'First Name', onClick: () => handleSortBy('first_name') },
    { text: 'Last Name', onClick: () => handleSortBy('last_name') },
    { text: 'User Name' },
    { text: 'Email', onClick: () => handleSortBy('email') },
    { text: 'Role' },
    { text: 'Action' }
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
    searchHandler,
    tableHeader
  };
};
export default useShowUserList;
