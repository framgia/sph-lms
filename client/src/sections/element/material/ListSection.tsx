import { ListItemI } from '@/src/pages/element/material';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Select from '@/src/shared/components/Select';
import Table from '@/src/shared/components/Table';
import { ListItem } from '@/src/shared/components/Table/ListItem';
import { useRouter } from 'next/router';
import { Fragment, type FC, useState } from 'react';

export enum MaterialHeaderEnum {
  Name = 'name',
  Type = 'type',
  Category = 'material_category_name',
  Data_Uploaded = 'created_at',
  Last_Modified = 'updated_at',
  Actions = 'Actions'
}

interface ListSectionProps {
  data: ListItemI[];
}

const ListSection: FC<ListSectionProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { push } = useRouter();
  const hanldeSearch = (): void => {
    // This function will be moved in integration task
  };

  const headers = Object.keys(MaterialHeaderEnum).map((text) => {
    // logic for sort goes here and be added to return object if needed
    // NOTE that we need a reusable hook for sorting, currenlty there are alot of code repetitions in the codebase,
    let clickHandler = null;
    // Example
    if (text === 'Name') {
      clickHandler = () => console.log('filter by name');
    }
    return {
      text: text.split('_').join(' '),
      onClick: clickHandler
    };
  });
  // This function will be moved in integration task
  const handlePagination = (page: number): void => {
    setCurrentPage(page);
  };
  const selectOptions = [
    { id: 8, text: '8' },
    { id: 10, text: '10' },
    { id: 25, text: '25' },
    { id: 50, text: '50' }
  ];
  const changeDirectory = (item: ListItemI): void => {
    if (item.id) {
      push(`#${item.id}`);
    }
  };

  const clickableColumns = {
    [MaterialHeaderEnum.Name]: changeDirectory
  };
  return (
    <Fragment>
      <div className="my-6 flex justify-between items-center">
        <Select divClass="!mb-0" value="8" options={selectOptions} />
        <SearchBar onSearchEvent={hanldeSearch} placeholder="Search" />
      </div>
      <Table header={headers}>
        {data.length > 0 ? (
          data.map((data, index) => (
            <ListItem<ListItemI>
              key={index}
              data={data}
              headerEnum={MaterialHeaderEnum}
              columnWithIcons={[MaterialHeaderEnum.Name]}
              clickableColumns={clickableColumns}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan={headers.length + 1}
              className="text-center pt-10 font-bold"
            >
              <div className="flex justify-center w-full">No data found</div>
            </td>
          </tr>
        )}
      </Table>
      <div className="flex justify-end my-10">
        <div className="flex items-center">Showing 1 to 8 of 5 entries</div>
      </div>
      <div className="my-6 flex justify-center">
        <Pagination
          maxPages={8}
          totalPages={5}
          currentPage={currentPage}
          onChangePage={handlePagination}
        />
      </div>
    </Fragment>
  );
};

export default ListSection;
