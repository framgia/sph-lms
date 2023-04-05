import React, { Fragment } from 'react';
import type { FC } from 'react';
import Button from '@/src/shared/components/Button';
import InputField from '@/src/shared/components/InputField';
import Modal from '@/src/shared/components/Modal/Modal';
import EditIcon from '@/src/shared/icons/EditIcon';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';
import useEditAddUser from '@/src/shared/hooks/useEditAddUser';
import Select from '@/src/shared/components/Select';
import Navbar from '@/src/shared/components/Navbar';
import Table from '@/src/shared/components/Table';
import Container from '@/src/shared/layouts/Container';
import Pagination from '@/src/shared/components/Pagination';
import Searchbar from '@/src/shared/components/SearchBar/SearchBar';
import { dropdownItems, navItems } from '@/src/shared/utils/navBarList';
import useShowUserList from '@/src/shared/hooks/useShowUserList';

const ListOfUser: FC = () => {
  const {
    isAddModalOpen,
    isEditModalOpen,
    isConfirmationModalOpen,
    confirmationMessage,
    handleOpenAddModal,
    handleOpenEditModal,
    options,
    role,
    handleValueChange,
    handleChange,
    handleSubmitUser,
    handleSubmitEdit,
    handleConfirm,
    handleDeleteUser,
    formData,
    setIsAddModalOpen,
    setIsEditModalOpen,
    setIsConfirmationModalOpen,
    errorFistName,
    errorLastName,
    errorEmail,
    errorPassword,
    confirmPassword
  } = useEditAddUser();
  const {
    showPerPageOption,
    handleChangePageEvent,
    handleShowPerPage,
    showPerPage,
    currentPage,
    lastIndex,
    startingIndex,
    numberOfUsers,
    limiter
  } = useShowUserList();
  const tableHeader = [
    'First Name',
    'Last Name',
    'username',
    'Email',
    'Role',
    'Quick Actions'
  ];

  const searchHandler = (searchTerm: string): void => {
    console.log(`Searching ${searchTerm}`);
  };

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
            <form onSubmit={handleSubmitUser}>
              <div className="space-y-6 pb-5">
                <div>
                  <label className="ml-6 text-sm font-bold">Role</label>
                  <div className="mx-6">
                    <Select
                      options={options}
                      value={role}
                      eventHandler={handleValueChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="ml-6 text-sm font-bold">First Name</label>
                  <div className="mx-6">
                    <InputField
                      value={formData.firstName}
                      eventHandler={handleChange}
                      name="firstName"
                      className={
                        errorFistName.length > 0 ? 'border-red-500' : ''
                      }
                    />
                    {errorFistName.length > 0 && (
                      <span className="text-red-500">{errorFistName}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="ml-6 text-sm font-bold">Last Name</label>
                  <div className="mx-6">
                    <InputField
                      value={formData.lastName}
                      eventHandler={handleChange}
                      name="lastName"
                      className={
                        errorLastName.length > 0 ? 'border-red-500' : ''
                      }
                    />
                    {errorLastName.length > 0 && (
                      <span className="text-red-500">{errorLastName}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="ml-6 text-sm font-bold">Email</label>
                  <div className="mx-6">
                    <InputField
                      value={formData.email}
                      eventHandler={handleChange}
                      name="email"
                      className={errorEmail.length > 0 ? 'border-red-500' : ''}
                    />
                    {errorEmail.length > 0 && (
                      <span className="text-red-500">{errorEmail}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mr-6">
                <Button text="Create New User" type="submit" />
              </div>
            </form>
          </Modal>
          <Modal isOpen={isEditModalOpen}>
            <div className="flex justify-between relative mx-6 sticky">
              <div>
                <h1 className="text-3xl mt-6 mb-14">John Strong</h1>
              </div>
              <div
                className="mt-8 cursor-pointer"
                onClick={() => {
                  setIsEditModalOpen(false);
                }}
              >
                <XmarkIcon />
              </div>
            </div>
            <form onSubmit={handleSubmitEdit}>
              <div className="space-y-6 pb-5">
                <div>
                  <label className="ml-6 text-sm font-bold">Role</label>
                  <div className="mx-6">
                    <Select
                      options={options}
                      value={role}
                      eventHandler={handleValueChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="ml-6 text-sm font-bold">Email</label>
                  <div className="mx-6">
                    <InputField
                      value={formData.email}
                      eventHandler={handleChange}
                      name="email"
                      className={errorEmail.length > 0 ? 'border-red-500' : ''}
                    />
                    {errorEmail.length > 0 && (
                      <span className="text-red-500">{errorEmail}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="ml-6 text-sm font-bold">First Name</label>
                  <div className="mx-6">
                    <InputField
                      value={formData.firstName}
                      eventHandler={handleChange}
                      name="firstName"
                      className={
                        errorFistName.length > 0 ? 'border-red-500' : ''
                      }
                    />
                    {errorFistName.length > 0 && (
                      <span className="text-red-500">{errorFistName}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="ml-6 text-sm font-bold">Last Name</label>
                  <div className="mx-6">
                    <InputField
                      value={formData.lastName}
                      eventHandler={handleChange}
                      name="lastName"
                      className={
                        errorLastName.length > 0 ? 'border-red-500' : ''
                      }
                    />
                    {errorLastName.length > 0 && (
                      <span className="text-red-500">{errorLastName}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="ml-6 text-sm font-bold">Password</label>
                  <div className="mx-6">
                    <InputField
                      value={formData.password}
                      eventHandler={handleChange}
                      name="password"
                      type="password"
                      className={
                        errorPassword.length > 0 ? 'border-red-500' : ''
                      }
                    />
                    {errorPassword.length > 0 && (
                      <span className="text-red-500">{errorPassword}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="ml-6 text-sm font-bold">
                    Confirm Password
                  </label>
                  <div className="mx-6">
                    <InputField
                      value={formData.confirmPassword}
                      eventHandler={handleChange}
                      name="confirmPassword"
                      type="password"
                      className={
                        confirmPassword.length > 0 ? 'border-red-500' : ''
                      }
                    />
                    {confirmPassword.length > 0 && (
                      <span className="text-red-500">{confirmPassword}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mx-6">
                <Button
                  text="Delete User"
                  color="bg-red-500"
                  hover="hover:bg-red-600"
                  onClick={handleDeleteUser}
                />
                <Button
                  text="Update User"
                  hover="hover:bg-blue-700"
                  type="submit"
                />
              </div>
            </form>
          </Modal>
          <Modal isOpen={isConfirmationModalOpen}>
            <div className="flex justify-between relative mr-6">
              <div>
                <h1 className="text-3xl mt-6 ml-6 mb-14">Confirmation</h1>
              </div>
              <div
                className="mt-8 mr-4 cursor-pointer"
                onClick={() => {
                  setIsConfirmationModalOpen(false);
                }}
              >
                <XmarkIcon />
              </div>
            </div>
            <div className="text-lg px-6 pb-10">{confirmationMessage}</div>
            <div className="flex justify-between mx-6">
              <Button
                text="Cancel"
                color="bg-red-500"
                hover="hover:bg-red-600"
                onClick={() => {
                  setIsConfirmationModalOpen(false);
                }}
              />
              <Button
                text="Confirm"
                hover="hover:bg-blue-700"
                onClick={handleConfirm}
              />
            </div>
          </Modal>
          <div className="flex justify-end pb-10">
            <Searchbar onSearchEvent={searchHandler} />
          </div>
          <div className="h-96">
            <Table header={tableHeader} checkbox={false}>
              {numberOfUsers === 0
                ? (
                <tr>
                  <td colSpan={5} className="text-center pt-10 font-bold">
                    <div className="flex justify-center w-full">
                      No data Found
                    </div>
                  </td>
                </tr>
                  )
                : (
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
                      {col.username}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.email}
                    </td>
                    <td className="px-6 py-4">{col.role}</td>
                    <td className="pl-12">
                      <div
                        className="cursor-pointer"
                        onClick={handleOpenEditModal}
                      >
                        <EditIcon classname="stroke-white"></EditIcon>
                      </div>
                    </td>
                  </tr>
                    ))
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
                entries
              </div>
            </div>
            <div className="flex justify-center pb-20">
              <div className="flex flex-row">
                <Pagination
                  maxPages={5}
                  totalPages={numberOfUsers / limiter}
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
