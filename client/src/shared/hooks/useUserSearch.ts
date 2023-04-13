import { useEffect, useState } from 'react';
import router from 'next/router';

import { type User } from '../utils';
import API from '@/src/apis';

const useUserSearch = (): any => {
  const [searchTerm, setSearchTerm] = useState('');

  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    async function fetchdata (): Promise<void> {
      try {
        const response = await API.get(
          `user/1?search=${searchTerm}`
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();
  }, [searchTerm]);

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

  return {
    userData,
    searchHandler
  };
};

export default useUserSearch;
