import LearningPathCard from '@/src/shared/components/Card/LearningPathCard';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import type { LearningPath } from '@/src/shared/utils';
import Link from 'next/link';
import { useState } from 'react';

const learningPaths: LearningPath[] = [
  {
    id: 1,
    image: '/image1.jpg',
    name: 'Vue Mastery',
    description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
    courses: [
      {
        id: 1,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
      {
        id: 2,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
    ],
    ratings: 2.2,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'NodeJS' },
    ],
    is_active: true,
  },
  {
    id: 2,
    image: '/image1.jpg',
    name: 'Vue Mastery',
    description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
    courses: [
      {
        id: 1,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
    ],
    ratings: 3.5,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'NodeJS' },
    ],
    is_active: true,
  },
  {
    id: 3,
    image: '/image1.jpg',
    name: 'Vue Mastery',
    description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
    courses: [
      {
        id: 1,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
      {
        id: 2,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
    ],
    ratings: 4.5,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'NodeJS' },
    ],
    is_active: true,
  },
  {
    id: 4,
    image: '/image1.jpg',
    name: 'Vue Mastery',
    description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
    courses: [
      {
        id: 1,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
      {
        id: 2,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
    ],
    ratings: 4.5,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'NodeJS' },
    ],
    is_active: true,
  },
  {
    id: 5,
    image: '/image1.jpg',
    name: 'Vue Mastery',
    description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
    courses: [
      {
        id: 1,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
      {
        id: 2,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
    ],
    ratings: 4.5,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'NodeJS' },
    ],
    is_active: true,
  },
  {
    id: 6,
    image: '/image1.jpg',
    name: 'Typescript Mastery',
    description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
    courses: [
      {
        id: 1,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
      {
        id: 2,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
      {
        id: 3,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
    ],
    ratings: 4.5,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'NodeJS' },
    ],
    is_active: false,
  },
  {
    id: 7,
    image: '/image1.jpg',
    name: 'Typescript Mastery',
    description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
    courses: [
      {
        id: 1,
        name: 'Vue Mastery',
        description: 'Lorem ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
        img_path: '/image1.jpg',
        ratings: 3.1,
        categories: [{ id: 1, name: 'JavaScript' }],
        is_active: true,
        lessons: [],
        order: 1,
      },
    ],
    ratings: 4.5,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'NodeJS' },
    ],
    is_active: false,
  },
];

const LearningPathListPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const handleSearch = (value: string): void => {
    console.log(value);
  };

  const handleChangePageEvent = (page: number): void => {
    setPage(page);
  };

  const renderTabContent = (status: boolean): JSX.Element => {
    return (
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {learningPaths
            .filter((learningPath) => (status ? learningPath.is_active : !learningPath.is_active))
            .map((learningPath) => (
              <LearningPathCard key={learningPath.id} learningPath={learningPath} />
            ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full pt-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <SearchBar onSearchEvent={handleSearch} placeholder="Search" />
            <Link
              href="/trainer/learning-paths/create"
              className="border border-red text-red text-sm h-9 items-center rounded-md font-medium px-4 py-2"
            >
              Create learning path
            </Link>
          </div>
          <div>
            <Tabs>
              <Tab title="Active">{renderTabContent(true)}</Tab>
              <Tab title="Inactive">{renderTabContent(false)}</Tab>
            </Tabs>
          </div>
        </div>
        <div className="flex justify-center items-center my-5">
          <Pagination
            maxPages={5}
            totalPages={10}
            currentPage={page}
            onChangePage={handleChangePageEvent}
          />
        </div>
      </div>
    </>
  );
};

export default LearningPathListPage;
