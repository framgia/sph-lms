/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { Fragment } from 'react';
import Container from '@/src/shared/layouts/Container';
import Select from '@/src/shared/components/Select';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import NotFoundPage from '@/src/pages/404';
import useEnrollUser from '@/src/shared/hooks/useEnrollUser';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Pagination from '@/src/shared/components/Pagination';
import Table from '@/src/shared/components/Table';

const EnrollUser: React.FC = () => {
  const {
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
    listOfUser,
  } = useEnrollUser();

  if (pageNotFound) {
    return <NotFoundPage />;
  }

  return (
    <Fragment>
      <Container>
        <div className="mb-10 mt-2">
          <Breadcrumbs paths={paths} />
        </div>
        <div>
          <h1 className="text-2xl text-blue-500 pb-10 pl-2">Enroll Users into {courseTitle}</h1>
        </div>
        <div className="pl-2 pb-5">
          <SearchBar onSearchEvent={searchHandler} />
        </div>
        <Table
          header={[
            { text: 'First Name' },
            { text: 'Last Name' },
            { text: 'Email' },
            { text: 'Creation Date' },
            { text: 'Role' },
          ]}
        >
          {Array.isArray(listOfUser) && listOfUser.length > 0 ? (
            listOfUser.map((col: any) => (
              <tr
                className="border-b whitespace-nowrap text-sm text-black1 font-sans h-5"
                key={col.id}
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="h-5 w-5 hover:bg-sky-700"></input>
                </td>
                <td className="px-6 py-4 text-lightBlue underline">{col.first_name}</td>
                <td className="px-6 py-4 text-lightBlue underline">{col.last_name}</td>
                <td className="px-6 py-4 text-lightBlue underline">{col.email}</td>
                <td className="px-6 py-4 text-lightBlue underline">{col.created_at}</td>
                <td className="px-6 py-4">{col.role.title}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center pt-10 font-bold">
                <div className="flex justify-center w-full">Loading . . .</div>
              </td>
            </tr>
          )}
        </Table>
        <div className="flex justify-end mt-3">
          <Select
            width="200px"
            eventHandler={handleShowPerPage}
            label="Show Per Page"
            options={showPerPageOption}
          />
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
      </Container>
    </Fragment>
  );
};

export default EnrollUser;
