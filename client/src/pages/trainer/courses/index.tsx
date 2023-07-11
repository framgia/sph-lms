import { useGetCoursesQuery } from '@/src/services/courseAPI';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Spinner from '@/src/shared/components/Spinner';
import type { DBCourse } from '@/src/shared/utils';
import { alertError } from '@/src/shared/utils';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import CourseCard from '../../../shared/components/Card/CourseCard';

const CoursesListPage: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const {
    data: { results: courses = [], totalPages, current_page_number: currentPage } = {},
    isLoading,
    error,
  } = useGetCoursesQuery({ search, page, pageSize: 12 });

  useEffect(() => {
    if (search === '') {
      const { query } = router;
      delete query.search;
      void router.replace({ query });
    }
  }, [search]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return alertError('An error occured');
  }

  const handleSearch = (search: string): void => {
    if (search) {
      void router.push({
        pathname: router.pathname,
        query: { ...router.query, search },
      });
    }
    setSearch(search);
    setPage(1);
  };

  const handleChangePageEvent = (page: number): void => {
    setPage(page);
  };

  return (
    <Fragment>
      <Head>
        <title>Courses</title>
      </Head>
      <div>
        <div className="flex justify-center">
          <div className="container mt-4 w-fit">
            <div className="flex justify-between gap-4 items-center mb-4">
              <SearchBar
                onSearchEvent={handleSearch}
                placeholder="Search"
                searchClass="sm:w-[24rem] md:w-[350px] md:lg-[400px] sm:h-[40px]"
              />
              <Link
                href="/trainer/courses/create"
                className="border border-red text-red text-sm h-9 items-center rounded-md font-medium px-4 py-2"
              >
                Create a course
              </Link>
            </div>
            <div className="flex justify-center mb-4">
              {/* eslint-disable-next-line multiline-ternary */}
              {!courses.length ? (
                <div className="flex items-center text-sm text-gray-400 h-24">
                  No courses to show
                </div>
              ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {courses.map((course: DBCourse) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-center items-center my-5">
              <Pagination
                maxPages={5}
                totalPages={totalPages}
                currentPage={currentPage}
                onChangePage={handleChangePageEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CoursesListPage;
