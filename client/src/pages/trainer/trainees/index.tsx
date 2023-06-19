/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Fragment, useState } from 'react';
import Container from '@/src/shared/layouts/Container';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Pagination from '@/src/shared/components/Pagination';
import Table from '@/src/shared/components/Table';
import { ListItem } from '@/src/shared/components/Table/ListItem';
import { useGetTrainerTraineesQuery } from '@/src/services/traineeAPI';
import { useRouter } from 'next/router';
import type { User } from '@/src/shared/utils';

const TraineeList: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data } = useGetTrainerTraineesQuery({
    searchQuery: search,
    pageNumber: page,
  });

  const handleSearch = (search: string): void => {
    setSearch(search);
  };

  const handleChangePage = (newPage: number): void => {
    setPage(newPage);
  };

  const header = [{ text: 'First Name' }, { text: 'Last Name' }, { text: 'Email' }];

  const handleTableClick = (traineeId: number): void => {
    void router.push(`/trainee/${traineeId}`);
  };

  const renderTraineeListItems = () => {
    return data?.results.length ? (
      data.results.map((trainee: User) => (
        <ListItem
          key={trainee.id}
          data={trainee}
          headerEnum={{
            'First Name': 'first_name',
            'Last Name': 'last_name',
            Email: 'email',
          }}
          showCheckbox={false}
          isAction={true}
          isClickable={true}
          handleClick={handleTableClick}
        />
      ))
    ) : (
      <tr>
        <td colSpan={4} className="text-center py-4 text-gray-400">
          No trainees to show
        </td>
      </tr>
    );
  };

  return (
    <Fragment>
      <Container className="px-28">
        <div className="flex justify-end my-5">
          <SearchBar onSearchEvent={handleSearch} placeholder="Search" />
        </div>
        <Table header={header} sortable={false} checkbox={false} selectableRows={false}>
          {renderTraineeListItems()}
        </Table>
        <div className="flex justify-center my-5">
          <Pagination
            maxPages={5}
            totalPages={data?.totalPages}
            currentPage={page}
            onChangePage={handleChangePage}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default TraineeList;
