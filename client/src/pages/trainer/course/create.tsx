import React, { Fragment } from 'react';
import { useCreateCourse } from '@/src/shared/hooks/useCreateCourse';
import { dropdownItems, navItems } from '../../demo/layouts/navbar';
import Navbar from '@/src/shared/components/Navbar';
import Container from '@/src/shared/layouts/Container';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import InputField from '@/src/shared/components/InputField';
import Textfield from '@/src/shared/components/TextField';
import Button from '@/src/shared/components/Button';
import Footer from '@/src/shared/components/Footer';
import Select from '@/src/shared/components/Select';

const CoursesCreate: React.FC = () => {
  const {
    handleInput,
    handleCancel,
    handleSubmit,
    postData,
    paths,
    categoriesOption
  } = useCreateCourse();

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <Container>
        <Breadcrumbs paths={paths} />
        <div className="flex flex-col mt-10">
          <form onSubmit={handleSubmit}>
            <div className="text-2xl text-sky-700">Create New Course</div>
            <div className="mt-12">
              <div className="block">
                <InputField
                  placeholder={'E.g. TypeScript 101'}
                  type="text"
                  width="40%"
                  label="Course Name *"
                  id="course-name"
                  name="title"
                  value={postData.title}
                  eventHandler={handleInput}
                />
              </div>
              <div className="block">
                <Textfield
                  resizable={false}
                  width="40%"
                  label="Course Description"
                  name="description"
                  value={postData.description}
                  eventHandler={handleInput}
                />
              </div>

              <div className="block">
                <Select
                  width="40%"
                  label="Course Category"
                  options={categoriesOption}
                  name="course_category"
                  value={postData.course_category}
                  eventHandler={handleInput}
                />
              </div>
            </div>
            <Footer alignment="right">
              <Button
                text="Cancel"
                color="bg-lightGray1"
                onClick={handleCancel}
              />
              <Button text="Create" color="bg-lightBlue" type="submit" />
            </Footer>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};

export default CoursesCreate;
