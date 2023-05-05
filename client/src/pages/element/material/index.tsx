/* eslint-disable multiline-ternary */
import DetailSection from '@/src/sections/element/material/DetailSection';
import ListSection from '@/src/sections/element/material/ListSection';
import AddMaterialModal from '@/src/sections/material/AddMaterialModal';
import Button from '@/src/shared/components/Button';
import Navbar from '@/src/shared/components/Navbar';
import Container from '@/src/shared/layouts/Container';
import { dropdownItems, navItems } from '@/src/shared/utils/navBarList';
import { useRouter } from 'next/router';
import { type FC, Fragment, useEffect, useState } from 'react';

export interface ListItemI {
  id: number;
  name: string;
  link: string | null;
  type: string;
  description: string | null;
  directory: number;
  material_category_name: string;
  created_at: Date;
  updated_at: Date;
}

const Material: FC = () => {
  const [data, setData] = useState<ListItemI | ListItemI[]>([]);
  const { asPath } = useRouter();

  useEffect(() => {
    const materialId = asPath.split('#')[1];

    // This is a temporary logic for the static data to work, it will be changed in itegration task
    if (!materialId || materialId === '2') {
      setData(dummyData);
    } else {
      setData(dummyData.filter((item) => item.id === +materialId)[0]);
    }
  }, [asPath]);

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
          {Array.isArray(data) ? (
            <ListSection data={data} />
          ) : (
            <div className="mt-4">
              <DetailSection data={data} />
            </div>
          )}
        </div>
      </Container>
    </Fragment>
  );
};

export default Material;

// Its only for test purposes, Please delete this dummyData after itegration with backend
// Note that its just for testing purposes and the real data wil be an array not an object
const dummyData = [
  {
    id: 1,
    name: 'Aladeen Madafaka',
    link: 'https://www.youtube.com/watch?v=85QH2OVFKGY',
    type: 'YouTube',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, repudiandae.',
    directory: 0,
    material_category_name: 'Category2',
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
    id: 4,
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
