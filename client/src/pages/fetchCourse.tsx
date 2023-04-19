/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { Fragment, useState } from 'react';
import Searchbar from '@/src/shared/components/SearchBar/SearchBar';
import useShowCourseList from '@/src/shared/hooks/useShowCourseList';

const FetchCourse: React.FC = () => {
  const { listOfCourse, listOfCategories, searchHandler } = useShowCourseList();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    'active' | 'inactive' | 'all'
  >('all');

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStatusFilter(event.target.value as typeof statusFilter);
  };

  return (
    <Fragment>
      <div className=" flex flex-row ">
        <div className="flex items-center pr-5 text-">Search</div>
        <div className="flex justify-end">
          <Searchbar onSearchEvent={searchHandler} />
        </div>
      </div>
      <div>
        <h2>List of Courses</h2>
        {listOfCourse &&
          listOfCourse.map((course) => (
            <div key={course.id}>
              <h2>{course.name}</h2>
              <p>{course.category}</p>
            </div>
          ))}
      </div>
      <br />
      <div>
        <h2>List of Course Categories</h2>
        {listOfCategories &&
          listOfCategories.map((category) => (
            <div key={category.id}>
              <label>
                <input
                  type="checkbox"
                  value={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onChange={(event) => {
                    const isChecked = event.target.checked;
                    setSelectedCategories((prevSelectedCategories) =>
                      isChecked
                        ? [...prevSelectedCategories, category.name]
                        : prevSelectedCategories.filter(
                            (name) => name !== category.name
                          )
                    );
                  }}
                />
                {category.name}
              </label>
            </div>
          ))}
      </div>
      <br />
      <div>
        <h2>Course Status</h2>
        <label>
          <input
            type="radio"
            name="status-filter"
            value="all"
            checked={statusFilter === 'all'}
            onChange={handleStatusFilterChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="status-filter"
            value="active"
            checked={statusFilter === 'active'}
            onChange={handleStatusFilterChange}
          />
          Active
        </label>
        <label>
          <input
            type="radio"
            name="status-filter"
            value="inactive"
            checked={statusFilter === 'inactive'}
            onChange={handleStatusFilterChange}
          />
          Inactive
        </label>
      </div>
    </Fragment>
  );
};

export default FetchCourse;
