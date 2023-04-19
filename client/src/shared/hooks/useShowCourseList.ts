/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import API from '@/src/apis';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { type CourseList } from '@/src/shared/utils';

const useShowCourseList = (): any => {
  const router = useRouter();
  const params = router.query;
  const [listOfCourse, setListOfCourse] = useState<CourseList[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState(true);
  const [listOfCategories, setListOfCategories] = useState<string[]>([]);

  const searchHandler = (searchTerm: string): void => {
    setSearchTerm(searchTerm);

    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        search: searchTerm
      }
    });
  };

  const handleSortBy = (attribute: string): void => {
    const newSortOrder = sortBy === attribute ? !sortOrder : true;
    setSortBy(attribute);
    setSortOrder(newSortOrder);

    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort_by: attribute,
        sort_order: newSortOrder ? 'asc' : 'desc'
      }
    });
  };

  useEffect(() => {
    const queryParams: any = {};

    if (sortBy !== 'id') {
      queryParams.sort_by = sortBy;
      queryParams.sort_order = sortOrder ? 'asc' : 'desc';
    }

    if (searchTerm !== '') {
      queryParams.search = searchTerm;
    }

    setListOfCourse([]);

    const fetchData = async (): Promise<void> => {
      try {
        const [coursesResponse, categoriesResponse] = await Promise.all([
          API.get('/course', {
            params: queryParams
          }),
          API.get('/category')
        ]);
        setListOfCourse(coursesResponse.data);
        setListOfCategories(categoriesResponse.data);
        console.log(coursesResponse.data);
        // console.log(categoriesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchData();
  }, [params, sortBy, sortOrder, searchTerm]);

  return {
    listOfCourse,
    listOfCategories,
    searchHandler,
    handleSortBy
  };
};
export default useShowCourseList;
