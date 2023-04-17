import React, { Fragment } from 'react';
import type { FC } from 'react';

import Select from '@/src/shared/components/Select';
import Navbar from '@/src/shared/components/Navbar';
import Table from '@/src/shared/components/Table';
import Container from '@/src/shared/layouts/Container';
import Pagination from '@/src/shared/components/Pagination';
import Searchbar from '@/src/shared/components/SearchBar/SearchBar';
import { dropdownItems, navItems } from '@/src/shared/utils/navBarList';
import useShowUserList from '@/src/shared/hooks/useShowUserList';
import UserCreate from '@/src/sections/users/usersCreate';
import UserEditDelete from '@/src/sections/users/usersUpdateDelete';

const ListOfUser: FC = () => {
  const {
    showPerPageOption,
    handleChangePageEvent,
    handleShowPerPage,
    currentPage,
    lastIndex,
    startingIndex,
    numberOfUsers,
    limiter,
    searchHandler,
    listOfUser,
    tableHeader
  } = useShowUserList();

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <Container>
        <div className=" flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="text-3xl flex justify-start pb-10 pt-5 text-lightBlue">
              Users
            </div>
            <UserCreate />
          </div>
          <div className="flex justify-end pb-10">
            <Searchbar onSearchEvent={searchHandler} />
          </div>
          <div className="h-96">
            <Table header={tableHeader} checkbox={false}>
              {Array.isArray(listOfUser) && listOfUser.length > 0
                ? (
                    listOfUser.map((col: any) => (
                  <tr
                    className="border-b whitespace-nowrap text-sm text-black1 font-sans h-5"
                    key={col.id}
                  >
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.first_name}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.last_name}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.username}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.email}
                    </td>
                    <td className="px-6 py-4">{col.role.title}</td>
                    <td className="pl-12">
                      <UserEditDelete id={col.id} />
                    </td>
                  </tr>
                    ))
                  )
                : (
                <tr>
                  <td colSpan={5} className="text-center pt-10 font-bold">
                    <div className="flex justify-center w-full">
                      Loading . . .
                    </div>
                  </td>
                </tr>
                  )}
            </Table>
            <div></div>
            <div className="flex flex-row justify-between pt-10 pb-10">
              <Select
                width="200px"
                eventHandler={handleShowPerPage}
                label="Show Per Page"
                options={showPerPageOption}
              />
              <div className="flex items-center">
                Showing {startingIndex} to {lastIndex} of {numberOfUsers}{' '}
                entries |
              </div>
            </div>
            <div className="flex justify-center pb-20">
              <div className="flex flex-row">
                <Pagination
                  maxPages={5}
                  totalPages={Math.ceil(numberOfUsers / limiter)}
                  currentPage={currentPage}
                  onChangePage={handleChangePageEvent}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default ListOfUser;
