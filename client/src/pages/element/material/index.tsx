/* eslint-disable multiline-ternary */
import AddMaterialModal from '@/src/sections/material/AddMaterialModal';
import Button from '@/src/shared/components/Button';
import Navbar from '@/src/shared/components/Navbar';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Select from '@/src/shared/components/Select';
import Table from '@/src/shared/components/Table';
import { ListItem } from '@/src/shared/components/Table/ListItem';
import Container from '@/src/shared/layouts/Container';
import { dropdownItems, navItems } from '@/src/shared/utils/navBarList';
import { type FC, Fragment, useState } from 'react';

export enum MaterialHeaderEnum {
  Name = 'name',
  Type = 'type',
  Category = 'material_category_name',
  Data_Uploaded = 'created_at',
  Last_Modified = 'updated_at',
  Actions = 'Actions'
}

export interface ListItemI {
  id?: number;
  name: string;
  type?: string;
  description?: string;
  directory: number;
  material_category_name: string;
  created_at: Date;
  updated_at: Date;
}

const Material: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const hanldeSearch = (): void => {
    // This function will be moved in integration task
  };

  const headers = Object.keys(MaterialHeaderEnum).map((text) => {
    // logic for sort goes here and be added to return object if needed
    // NOTE that we need a reusable hook for sorting, currenlty there are alot of code repetitions in the codebase,
    return {
      text: text.split('_').join(' ')
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

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <Container>
        <div className="flex items-center justify-between w-full mt-5">
          <div className="text-lightBlue">
            <h1 className="text-[2rem]">Materials</h1>
            <h3 className="mt-2">All Materials</h3>
          </div>
          <div className="flex">
            <Button
              textColor="text-blue-500"
              color="white border border-blue-500"
              text="New Folder"
            />
            <AddMaterialModal />
          </div>
        </div>
        <div>
          <div className="my-6 flex justify-between items-center">
            <Select divClass="!mb-0" value="8" options={selectOptions} />
            <SearchBar onSearchEvent={hanldeSearch} placeholder="Search" />
          </div>
          <Table header={headers}>
            {dummyData.length > 0 ? (
              dummyData.map((data, index) => (
                <ListItem<ListItemI>
                  key={index}
                  data={data}
                  headerEnum={MaterialHeaderEnum}
                  columnWithIcons={[MaterialHeaderEnum.Name]}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="text-center pt-10 font-bold"
                >
                  <div className="flex justify-center w-full">
                    No data found
                  </div>
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
        </div>
      </Container>
    </Fragment>
  );
};

export default Material;

// Its only for test purposes, Please delete this dummyData after itegration with backend
const dummyData = [
  {
    id: 1,
    name: 'name1',
    link: 'https://youtube.com',
    type: 'YouTube',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, repudiandae.',
    directory: 0,
    material_category_name: 'material 1',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    name: 'name',
    link: null,
    type: 'Folder',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, repudiandae.',
    directory: 0,
    material_category_name: 'material 2',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    name: 'name',
    link: 'https://test.com',
    type: 'Link',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, repudiandae.',
    directory: 0,
    material_category_name: 'material 3',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    name: 'name',
    link: 'https:test1.com',
    type: 'PDF',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, repudiandae.',
    directory: 0,
    material_category_name: 'material 3',
    created_at: new Date(),
    updated_at: new Date()
  }
];
