/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Fragment, useState } from 'react';
import Container from '@/src/shared/layouts/Container';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Pagination from '@/src/shared/components/Pagination';
import Table from '@/src/shared/components/Table';
import { ListItem } from '@/src/shared/components/Table/ListItem';

const TraineeList: React.FC = () => {
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const handleSearch = (): void => {
    // Search logic here
    'not yet implemented';
  };

  const data: any = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      id: i,
      firstName: 'Jonathan',
      lastName: 'Doeriski',
      email: `johndoe${i}@gmail.com`,
    });
  }
  // Pagination not yet implemented
  const totalPages = Math.ceil(data.length / pageSize);

  const handleChangePage = (newPage: number): void => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  data.slice(startIndex, endIndex);

  const header = [{ text: 'First Name' }, { text: 'Last Name' }, { text: 'Email' }];

  const handleTableClick = (): void => {
    // Manage Redirection to Traiee Detail here
    console.log('clicked!');
  };

  const renderTraineeListItems = () => {
    return data.map((trainee: any) => (
      <ListItem
        key={trainee.id}
        data={trainee}
        headerEnum={{
          'First Name': 'firstName',
          'Last Name': 'lastName',
          Email: 'email',
        }}
        showCheckbox={false}
        isAction={true}
        isClickable={handleTableClick}
      />
    ));
  };

  return (
    <Fragment>
      <Container className="px-28">
        <div className="flex justify-end my-5">
          <SearchBar onSearchEvent={handleSearch} placeholder="Search" />
        </div>
        <Table header={header} sortable={false} checkbox={false}>
          {renderTraineeListItems()}
        </Table>
        <div className="flex justify-center my-5">
          <Pagination
            maxPages={5}
            totalPages={totalPages}
            currentPage={page}
            onChangePage={handleChangePage}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default TraineeList;
