import type { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';

import Card from '@/src/shared/components/Card';
import Checkbox from '@/src/shared/components/Checkbox';
import RadioButton from '@/src/shared/components/RadioButton';

import { LeftSideBar } from '@/src/shared/layouts/RightSideBar/LeftSideContainer';
import { RightSideBar } from '@/src/shared/layouts/RightSideBar/RightSideBar';

interface Category {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  course_category: number;
  is_active: boolean;
}

interface Props {
  categories: Category[];
  courses: Course[];
}

const CoursesPage: NextPage<Props> = ({ categories, courses }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<boolean>(true);

  const handleCategoryChange = (id: number): void => {
    // console.log('Selected category ID:', id * -1 + 1);
    setSelectedCategories((prevSelectedCategories) => {
      const isSelected = prevSelectedCategories.includes(id * -1 + 1);
      // console.log('Prev selected categories:', prevSelectedCategories);
      // console.log('Is category already selected?', isSelected);
      const updatedSelectedCategories = isSelected
        ? prevSelectedCategories.filter((c) => c !== id * -1 + 1)
        : [...prevSelectedCategories, id * -1 + 1];
      // console.log('Updated selected categories:', updatedSelectedCategories);
      return updatedSelectedCategories;
    });
  };

  const handleStatusChange = (status: boolean): void => {
    setSelectedStatus(status);
    console.log('Selected status:', selectedStatus);
  };

  // const filteredCourses = selectedCategories.length === 0
  //   ? courses
  //   : courses.filter((course) => selectedCategories.includes(course.course_category));
  // console.log('Filtered courses:', filteredCourses);

  const filteredCourses = courses.filter((course) => {
    const isCourseInSelectedCategories =
      selectedCategories.length === 0 || selectedCategories.includes(course.course_category);
    const isCourseActive = course.is_active;
    const shouldIncludeCourse =
      (selectedStatus && isCourseActive) || (!selectedStatus && !isCourseActive);

    return isCourseInSelectedCategories && shouldIncludeCourse;
  });

  return (
    <>
      <LeftSideBar>
        {filteredCourses.length === 0
          ? <p>No courses available for the selected category.</p>
          : (
            <div className="grid grid-cols-3">
              {filteredCourses.map((course) => (
                <div key={course.id} className="m-2">
                  <Card title={course.title} height="h-50">
                    <p>{course.description}</p>
                  </Card>
                </div>
              ))}
            </div>
            )}
      </LeftSideBar>
      <RightSideBar>
        <h1 className="text-xl font-bold">Course Status</h1>
        <br />
        <hr />
        <RadioButton
          options={['Active', 'Inactive']}
          selectedOption={selectedStatus}
          onOptionChange={(option) => { handleStatusChange(option === 'Active'); }}
        />
        <br />
        <br />
        <h1 className="text-xl font-bold">Category</h1>
        <br />
        <hr />
        <Checkbox
          options={categories.map((category) => category.name)}
          selectedOptions={selectedCategories}
          onOptionChange={handleCategoryChange}
          className=""
        />
      </RightSideBar>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [coursesRes, categoriesRes] = await Promise.all([
    fetch('http://localhost:8000/api/course/'),
    fetch('http://localhost:8000/api/course-category/')
  ]);
  const [courses, categories] = await Promise.all([
    coursesRes.json(),
    categoriesRes.json()
  ]);

  console.log('Fetched courses:', courses);
  // console.log('Fetched categories:', categories);

  return {
    props: { categories, courses }
  };
};

export default CoursesPage;
