import { useGetTraineeCoursesQuery } from '@/src/services/traineeAPI';
import TraineeCourseCard from '@/src/shared/components/Card/TraineeCourseCard';
import { DropDownOptions } from '@/src/shared/components/Dropdown/SortDropdown/DropDownOptions';
import SortDropdown from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Spinner from '@/src/shared/components/Spinner';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import { alertError, type CourseCollection } from '@/src/shared/utils';
import Link from 'next/link';
import { Fragment, useState } from 'react';

const CoursesSection = (): JSX.Element => {
  const [selectedSortOption, setSelectedSortOption] = useState('A - Z');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const {
    data: { results: CourseCollection = [], totalPages, current_page_number: currentPage } = {},
    error,
    isLoading,
  } = useGetTraineeCoursesQuery({
    search,
    sort: selectedSortOption,
    pageNumber: page,
    pageSize: 4,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return alertError('An error occurred');
  }

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
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex justify-between items-center">
        <SearchBar onSearchEvent={handleSearch} placeholder="Search" />
        <SortDropdown
          options={DropDownOptions}
          onChange={handleSortOptionChange}
          buttonText={selectedOption ?? 'A - Z'}
          buttonIcon={<FilterIcon />}
          buttonClass="w-fit"
        />
      </div>

      <div className="flex flex-col justify-center w-full">
        {!CourseCollection.length ? (
          <div className="flex items-center justify-center text-sm text-gray-400 h-24">
            No learning paths to show
          </div>
        ) : (
          <Fragment>
            <div className="flex flex-col gap-4">
              {CourseCollection.map((course: CourseCollection) => (
                <Link key={course.id} href={`/trainee/course/${course.id}`}>
                  <TraineeCourseCard course={course} />
                </Link>
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
  );
};

export default CoursesSection;
