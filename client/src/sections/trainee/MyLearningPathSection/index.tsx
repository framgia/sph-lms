import { useGetLearningPathsQuery } from '@/src/services/learningPathAPI';
import LearningPathCard from '@/src/shared/components/Card/LearningPathCard';
import SortDropdown, {
  type SortOption,
} from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Spinner from '@/src/shared/components/Spinner';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import { alertError, type LearningPath } from '@/src/shared/utils';
import { Fragment, useState } from 'react';

const MyLearningPathSection = (): JSX.Element => {
  const [selectedSortOption, setSelectedSortOption] = useState('A - Z');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const {
    data: { results: learningPaths = [], totalPages, current_page_number: currentPage } = {},
    error,
    isLoading,
  } = useGetLearningPathsQuery({
    page,
    search,
    isActive: true,
    sort: selectedSortOption,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return alertError('An error occurred');
  }

  const sortOptions: SortOption[] = [
    { label: 'A - Z', value: 'A - Z' },
    { label: 'Z - A', value: 'Z - A' },
  ];

  const handleSearch = (value: string): void => {
    setSearch(value);
    setPage(1);
  };

  const handleSortOptionChange = (option: string): void => {
    setSelectedSortOption(option);
    setSelectedOption(option);
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
                  totalPages={totalPages}
                  currentPage={currentPage}
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

export default MyLearningPathSection;
