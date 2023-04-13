import React, { Fragment } from 'react';
import AddClassModal from '@/src/sections/classes/AddClassModal';
import Navbar from '@/src/shared/components/Navbar';
import Table from '@/src/shared/components/Table';
import Container from '@/src/shared/layouts/Container';
import Searchbar from '@/src/shared/components/SearchBar/SearchBar';
import Select from '@/src/shared/components/Select';
import Pagination from '@/src/shared/components/Pagination';
import { dropdownItems, navItems } from '@/src/shared/utils/navBarList';
import useShowClassList from '@/src/shared/hooks/useShowClassList';
import type { FC } from 'react';

const ClassList: FC = () => {
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
  } = useShowClassList();
  const tableHeader = [
    'Class Name',
    'Class Trainer',
    'Number of Trainees',
    'Number of Courses'
  ];
  const searchHandler = (searchTerm: string): void => {
    console.log(`Searching ${searchTerm}`);
  };
  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <div>
        <div></div>
      </div>
      <Container>
        <div className=" flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="text-3xl flex justify-start pb-10 pt-5 text-lightBlue">
              Groups
            </div>
            <div className="flex justify-start pb-10 pt-5">
              <AddClassModal />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <Select
                width="200px"
                eventHandler={handleShowPerPage}
                label="Show No. of Entries"
                options={showPerPageOption}
              />
            </div>
            <div className=" flex flex-row ">
              <div className="flex items-center pr-5 text-">Search</div>
              <div className="flex justify-end">
                <Searchbar onSearchEvent={searchHandler} />
              </div>
            </div>
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
                      {col.class_name}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.class_trainer}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.number_of_trainees}
                    </td>
                    <td className="px-6 py-4">{col.number_of_courses}</td>
                  </tr>
                    ))
                  )}
            </Table>
            <div></div>
            <div className="flex flex-row justify-end pt-10 pb-10">
              <div className="flex items-center">
                Showing {startingIndex} to {lastIndex} of {numberOfUsers}{' '}
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

export default ClassList;
