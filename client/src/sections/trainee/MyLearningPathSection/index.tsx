import SortDropdown, {
  type SortOption,
} from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import CourseCard from '@/src/shared/components/Card/CourseCard';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import React, { Fragment, useState } from 'react';
import { type DBCourse } from '@/src/shared/utils';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import Pagination from '@/src/shared/components/Pagination';

const MyLearningPathSection = (): JSX.Element => {
  const [selectedSortOption, setSelectedSortOption] = useState('A - Z');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const sortOptions: SortOption[] = [
    { label: 'A - Z', value: 'A - Z' },
    { label: 'Z - A', value: 'Z - A' },
  ];

  const handleSearch = (value: string): void => {
    alert(`You searched ${value}.`);
  };

  const handleSortOptionChange = (option: string): void => {
    setSelectedSortOption(option);
    setSelectedOption(option);
  };

  const handleChangePageEvent = (page: number): void => {
    setPage(page);
  };
  return (
    <Fragment>
        <div className="flex justify-center">
            <div className="container w-fit">
                <div className="flex justify-between items-center mb-4">
                  <SearchBar
                    onSearchEvent={handleSearch}
                    placeholder="Search"
                    searchClass="sm:w-[24rem] md:w-[350px] md:lg-[400px] sm:h-[40px]"
                  />
                  <SortDropdown
                    options={sortOptions}
                    onChange={handleSortOptionChange}
                    buttonText={selectedOption ?? 'A - Z'}
                    buttonIcon={<FilterIcon />}
                    buttonClass="w-auto h-[25px] text-[14px]"
                  />
                </div>
                <div className="flex justify-center mb-4">
                    {!courses.length ? (
                        <div className="flex items-center justify-center text-sm text-gray-400 h-24">
                          No courses to show
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {courses.map((course: DBCourse) => (
                            <CourseCard key={course.id} course={course} />
                          ))}
                        </div>
                    )}
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
        </div>
    </Fragment>
  );
};

const courses: DBCourse[] = [
  {
    id: 1,
    name: 'Course 1',
    description: 'Course description for course 1',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    lessons: [],
    image: null
  },
  {
    id: 2,
    name: 'Course 2',
    description: 'Course description for course 2',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    lessons: [],
    image: null
  },
  {
    id: 3,
    name: 'Course 3',
    description: 'Course description for course 3',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    lessons: [],
    image: null
  },
  {
    id: 4,
    name: 'Course 4',
    description: 'Course description for course 4',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    lessons: [],
    image: null
  },
  {
    id: 5,
    name: 'Course 5',
    description: 'Course description for course 5',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    lessons: [],
    image: null
  },
  {
    id: 6,
    name: 'Course 6',
    description: 'Course description for course 6',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    lessons: [],
    image: null
  },
  {
    id: 7,
    name: 'Course 7',
    description: 'Course description for course 7',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    lessons: [],
    image: null
  },
];

export default MyLearningPathSection;
