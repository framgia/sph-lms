import React, { Fragment } from 'react';
import type { FC } from 'react';

import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';
import Select from '@/src/shared/components/Select';
import Navbar from '@/src/shared/components/Navbar';
import Table from '@/src/shared/components/Table';
import Container from '@/src/shared/layouts/Container';
import Pagination from '@/src/shared/components/Pagination';
import Searchbar from '@/src/shared/components/SearchBar/SearchBar';
import { dropdownItems, navItems } from '@/src/shared/utils/navBarList';
import useShowUserList from '@/src/shared/hooks/useShowUserList';
import useEditAddUserModal from '@/src/shared/hooks/useEditAddUserModal';
import UserCreate from '@/src/sections/users/usersCreate';
import UserEditDelete from '@/src/sections/users/usersUpdateDelete';

const ListOfUser: FC = () => {
  const { isAddModalOpen, handleOpenAddModal, setIsAddModalOpen } =
    useEditAddUserModal();
  const {
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
    listOfUser
  } = useShowUserList();
  const tableHeader = [
    'First Name',
    'Last Name',
    'username',
    'Email',
    'Role',
    'Quick Actions'
  ];

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <Container>
        <div className=" flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="text-3xl flex justify-start pb-10 pt-5 text-lightBlue">
              Users
            </div>
            <div className="pb-10 pt-5">
              <Button
                text="Add User"
                hover="hover:bg-blue-700"
                width="20"
                onClick={handleOpenAddModal}
              />
            </div>
          </div>
          <Modal isOpen={isAddModalOpen}>
            <div className="flex justify-between relative mx-6">
              <div>
                <h1 className="text-3xl mt-6 mb-14">Add a new User</h1>
              </div>
              <div
                className="mt-8 cursor-pointer"
                onClick={() => {
                  setIsAddModalOpen(false);
                }}
              >
                <XmarkIcon />
              </div>
            </div>
            <UserCreate />
          </Modal>
          <div className="flex justify-end pb-10">
            <Searchbar onSearchEvent={searchHandler} />
          </div>
          <div className="h-96">
            <Table header={tableHeader} checkbox={false}>
              {Array.isArray(showPerPage) && showPerPage.length > 0
                ? (
                    showPerPage.map((col: any) => (
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
                      User does not exist
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
                Showing {startingIndex} to {lastIndex} of {listOfUser.length}{' '}
                entries
              </div>
            </div>
            <div className="flex justify-center pb-20">
              <div className="flex flex-row">
                <Pagination
                  maxPages={5}
                  totalPages={Math.floor(
                    numberOfUsers / limiter +
                      (numberOfUsers % limiter === 0 ? 0 : 1)
                  )}
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
