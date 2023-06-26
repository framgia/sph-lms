import TraineeCourseCard from '@/src/shared/components/Card/TraineeCourseCard';
import SortDropdown from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import Link from 'next/link';

const CoursesSection = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex justify-between items-center">
        <SearchBar onSearchEvent={() => {}} placeholder="Search" />
        <SortDropdown
          buttonText="A - Z"
          onChange={() => {}}
          options={[
            { label: 'A - Z', value: 'A - Z' },
            { label: 'Z - A', value: 'Z - A' },
          ]}
          buttonIcon={<FilterIcon />}
          buttonClass="w-fit"
        />
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((course) => (
          <Link key={course} href="#">
            <TraineeCourseCard />
          </Link>
        ))}
      </div>
      <div className="flex gap-1">
        <ShowIcon />
        <button className="text-xs underline underline-offset-4" onClick={() => {}}>
          See more courses
        </button>
      </div>
    </div>
  );
};

export default CoursesSection;
