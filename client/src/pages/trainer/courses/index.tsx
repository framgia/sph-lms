import React, { Fragment, useState } from 'react';
import Button from '@/src/shared/components/Button';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Pagination from '@/src/shared/components/Pagination';
import CourseCard from '../../../shared/components/Card/CourseCard';
import type { Course } from '@/src/shared/utils';

// SAMPLE COURSE
export const courses: Course[] = [
  {
    id: 1,
    image:
      'https://cdn.idropnews.com/wp-content/uploads/1970/01/23083056/MacBook-Pro.jpg',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur. Amet senectus augue in urna.',
    ratings: 2.2,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  },
  {
    id: 2,
    image:
      'https://www.shortform.com/blog/wp-content/uploads/2021/10/smarphone-apple-iphone-laptop-technology-750x350.jpg',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, aliquam.',
    ratings: 3.2,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  },
  {
    id: 3,
    image:
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/Top_18_Technical_Courses_After_Graduation.jpg',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, aliquam.',
    ratings: 1.3,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, aliquam.',
    ratings: 3,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  },
  {
    id: 5,
    image:
      'https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20190710onlinelearning.jpg',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, aliquam.',
    ratings: 5.0,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  },
  {
    id: 6,
    image:
      'https://res.cloudinary.com/highereducation/images/f_auto,q_auto/v1664380340/AccreditedSchoolsOnline.org/GettyImages-1221204650_8194983b6/GettyImages-1221204650_8194983b6.jpg ',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, aliquam.',
    ratings: 3.4,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  },
  {
    id: 7,
    image:
      'https://cdn.idropnews.com/wp-content/uploads/1970/01/23083056/MacBook-Pro.jpg',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, aliquam.',
    ratings: 2.2,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  },
  {
    id: 8,
    image:
      'https://www.shortform.com/blog/wp-content/uploads/2021/10/smarphone-apple-iphone-laptop-technology-750x350.jpg',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, aliquam.',
    ratings: 3.2,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  },
  {
    id: 9,
    image:
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/Top_18_Technical_Courses_After_Graduation.jpg',
    title: 'Vue Mastery',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, aliquam.',
    ratings: 1.3,
    categories: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 4, name: 'React.js' }
    ],
    is_active: false
  }
];

const handleSearch = (query: string): void => {
  alert(`You Searched "${query}"`);
};

const handleCreate = (): void => {
  alert('Show Create Panel');
};

const CoursesListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePageEvent = (page: number): void => {
    setCurrentPage(page);
  };
  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="container mt-4">
            <div className="flex justify-between items-center mb-3 md:mx-28 lg:mx-24 xl:52 2xl:mx-[12.5rem]">
              <SearchBar
                onSearchEvent={handleSearch}
                placeholder="Search"
                searchClass="sm:w-[24rem] md:w-[350px] md:lg-[400px] sm:h-[40px]"
              />
              <Button
                text="Create a course"
                textColor="text-red text-md font-bold"
                color="bg-white"
                buttonClass="border-2 border-red"
                onClick={handleCreate}
                width="w-[139px] h-[36px]"
              />
            </div>
            <div className="flex justify-center mb-4">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-5">
          <Pagination
            maxPages={5}
            totalPages={10}
            currentPage={currentPage}
            onChangePage={handleChangePageEvent}
          />
        </div>
      </div>
    </>
  );
};

export default CoursesListPage;
