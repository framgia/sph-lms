import LearningPathCard from '@/src/shared/components/Card/LearningPathCard';
import SortDropdown, {
  type SortOption,
} from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import { type LearningPath } from '@/src/shared/utils';
import { Fragment, useState } from 'react';

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
    alert(selectedSortOption);
  };

  const handleChangePageEvent = (page: number): void => {
    setPage(page);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col gap-4 container">
        <div className="flex justify-between items-center">
          <SearchBar onSearchEvent={handleSearch} placeholder="Search" />
          <SortDropdown
            options={sortOptions}
            onChange={handleSortOptionChange}
            buttonText={selectedOption ?? 'A - Z'}
            buttonIcon={<FilterIcon />}
            buttonClass="w-fit"
          />
        </div>
        <div className="flex flex-col justify-center w-full">
          {!learningPaths.length ? (
            <div className="flex items-center justify-center text-sm text-gray-400 h-24">
              No learning paths to show
            </div>
          ) : (
            <Fragment>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {learningPaths.map((learningPath: LearningPath) => (
                  <LearningPathCard
                    key={learningPath.id}
                    learningPath={learningPath}
                    isTrainee={true}
                  />
                ))}
              </div>
              <div className="flex justify-center items-center my-5">
                <Pagination
                  maxPages={5}
                  totalPages={10}
                  currentPage={page}
                  onChangePage={handleChangePageEvent}
                />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const learningPaths: LearningPath[] = [
  {
    id: 1,
    name: 'Learning Path 1',
    description: 'Learning Path description for learning path 1',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    image:
      'https://cdn.idropnews.com/wp-content/uploads/2021/06/15114239/New-iMac-at-Apple-Store.jpg',
    courses: [],
    is_active: true,
    course_count: 0,
  },
  {
    id: 2,
    name: 'Learning Path 2',
    description: 'Learning Path description for learning path 2',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    image: 'https://cdn.idropnews.com/wp-content/uploads/2018/01/23100945/iPhone-X-iPhone-81.jpg',
    courses: [],
    is_active: true,
    course_count: 0,
  },
  {
    id: 3,
    name: 'Learning Path 3',
    description: 'Learning Path description for learning path 3',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    image: 'https://cdn.idropnews.com/wp-content/uploads/2022/06/21102000/Amazon-Prime-Day.jpg',
    courses: [],
    is_active: true,
    course_count: 0,
  },
  {
    id: 4,
    name: 'Learning Path 4',
    description: 'Learning Path description for learning path 4',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    image:
      'https://cdn.idropnews.com/wp-content/uploads/2021/11/23115407/apple-self-repair-manuel.jpg',
    courses: [],
    is_active: true,
    course_count: 0,
  },
  {
    id: 5,
    name: 'Learning Path 5',
    description: 'Learning Path description for learning path 5',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    image: 'https://cdn.idropnews.com/wp-content/uploads/2021/12/09131157/spotify-app.jpg',
    courses: [],
    is_active: true,
    course_count: 0,
  },
  {
    id: 6,
    name: 'Learning Path 6',
    description: 'Learning Path description for learning path 6',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    image: 'https://cdn.idropnews.com/wp-content/uploads/2022/05/20065316/iphone-apps.jpg',
    courses: [],
    is_active: true,
    course_count: 0,
  },
  {
    id: 7,
    name: 'Learning Path 7',
    description: 'Learning Path description for learning path 7',
    category: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React JS' },
      { id: 3, name: 'Next JS' },
    ],
    image:
      'https://cdn.idropnews.com/wp-content/uploads/2019/12/16130903/iPhone-Water-Resistance-and-Cleaning.jpg',
    courses: [],
    is_active: true,
    course_count: 0,
  },
];

export default MyLearningPathSection;
