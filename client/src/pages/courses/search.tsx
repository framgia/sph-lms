import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import debounce from '@/src/utils/debounce';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import axiosInstance from '@/src/utils/axios';
import Card from '@/src/shared/components/Card';
import { LeftSideBar } from '@/src/shared/layouts/RightSideBar/LeftSideContainer';
import { RightSideBar } from '@/src/shared/layouts/RightSideBar/RightSideBar';

export interface CourseProps {
  id: number;
  title: string;
  course_category: number;
}

const SearchPage: React.FC = () => {
  const [data, setData] = useState<[]>([]);
  useEffect(() => {
    async function fetchData (): Promise<void> {
      const response = await axiosInstance.get('/course/');
      setData(response.data);
    }
    void fetchData();
  }, []);

  const router = useRouter();
  const { q } = router.query;

  const handleOnSearchEvent = (searchTerm: string): void => {
    debounce(router.push(`/courses/search?q=${searchTerm}`), 500);
  };
  const searchResultsView = (): React.ReactElement => {
    const searchedCourses = data.filter((course: any) => course.title.toLowerCase().includes(q as string));
    if (searchedCourses.length === 0) {
      return (
        <h1 className="text-lg font-bold">No results found for: {q}</h1>
      );
    }

    return (
      <>
        <h1 className="text-lg font-bold">Search Results: {q}</h1>
        { searchedCourses?.map((course: any) => (
          <Card key={course.title} height="100%" title={course.title}>
            <p>{course.description}</p>
          </Card>
        )) }
      </>
    );
  };

  return (
    <>
      <LeftSideBar>
        <SearchBar onSearchEvent={handleOnSearchEvent} />
        { q !== undefined && q !== '' && searchResultsView() }
      </LeftSideBar>
      <RightSideBar>
        <p>Right Side Bar</p>
      </RightSideBar>
    </>
  );
};

export default SearchPage;
