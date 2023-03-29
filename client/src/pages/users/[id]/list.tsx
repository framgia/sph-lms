import React from 'react';
import Search from '@/src/shared/components/Search';
import { useRouter } from 'next/router';

const UsersList: React.FC = () => {
  const router = useRouter();

  const handleSearchEvent = (searchTerm: string): void => {
    router.query.search = searchTerm;
    void router.push(router);
    console.log(searchTerm);
  };

  return (
    <Search onSearchEvent={handleSearchEvent}/>
  );
};

export default UsersList;
