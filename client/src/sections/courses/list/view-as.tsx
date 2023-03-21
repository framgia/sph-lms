/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { Fragment } from 'react';
import type { FC } from 'react';
import GridCard from '@/src/shared/cards/GridCard';
import ListCard from '@/src/shared/cards/ListCard';
import { RightSideBar } from '@/src/shared/layouts/RightSideBar/RightSideBar';
import RadioButton from '@/src/shared/components/RadioButton';
import useFilterCourse from '@/src/shared/hooks/useFilterCourse';
import { formatToLocaleDateString } from '@/src/shared/utils';

export interface TypeOfViewProps {
  typeOfView: string;
  courses: string[];
}

const ViewAs: FC<TypeOfViewProps> = ({ typeOfView }: TypeOfViewProps) => {
  const {
    courses,
    categories,
    selectedCategories,
    isActive,
    setIsActive,
    handleCategoryChange
  } = useFilterCourse();

  return (
    <Fragment>
      {typeOfView === 'grid'
        ? (
        <div className="grid grid-cols-3 ">
          {courses.map((course) => (
            <div
              key={course.id}
              className="m-3 drop-shadow-lg h-80 border-2 flex justify-between"
            >
              <GridCard
                courseTitle={course.title}
                imageSource={'/image1.jpg'}
                category={'Category ' + String(course.course_category)}
                date={formatToLocaleDateString(course.created_at)}
              ></GridCard>
            </div>
          ))}
        </div>
          )
        : (
        <div>
          {courses.map((course) => (
            <div key={course.id} className="m-3">
              <ListCard
                courseTitle={course.title}
                imageSource={'/image1.jpg'}
                category={course.description}
                date={formatToLocaleDateString(course.created_at)}
              ></ListCard>
            </div>
          ))}
        </div>
          )}

      <RightSideBar>
        <div className="mt-20">
          <div>
            <h1 className="pb-2 pt-5 font-medium text-2xl">Course Status</h1>
            <hr className="pb-2" />
          </div>
          <div className="pb-2 text-lg">
            <RadioButton
              options={['Active', 'Inactive']}
              selectedOption={isActive ? 'Active' : 'Inactive'}
              onOptionChange={(option: string) => {
                setIsActive(option === 'Active');
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <h1 className="pb-2 pt-5 font-medium text-2xl">Course Category</h1>
            <hr className="pb-2" />
          </div>
          {categories.map((category) => (
            <div key={category.id} className="pb-2 text-lg">
              <input
                type="checkbox"
                checked={
                  selectedCategories.find((cat) => cat.id === category.id)
                    ?.selected ?? false
                }
                onChange={() => {
                  handleCategoryChange(category.id);
                }}
              />
              {category.name}
            </div>
          ))}
        </div>
      </RightSideBar>
    </Fragment>
  );
};

export default ViewAs;
