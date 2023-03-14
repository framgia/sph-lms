import React from 'react';
import Container from '@/src/shared/layouts/Container';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import InputField from '@/src/shared/components/InputField';
import Textfield from '@/src/shared/components/TextField';
import Button from '@/src/shared/components/Button';
import Footer from '@/src/shared/components/Footer';
import Select from '@/src/shared/components/Select';
import { useCreateCourse } from '@/src/shared/hooks/useCreateCourse';

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
    <Container>
      <Breadcrumbs paths={paths} />
      <div className="flex flex-col mt-10">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl font-bold">Create Course</div>
          <div className="mt-12">
            <div className="block">
              <InputField
                placeholder={'E.g. TypeScript 101'}
                type="text"
                width="20%"
                height="50px"
                label="Course Name"
                id="course-name"
                name="title"
                value={postData.title}
                eventHandler={handleInput}
              />
            </div>
            <div className="block">
              <Textfield
                className="text-xl border border-black rounded-md rows"
                resizable={false}
                width={30}
                height={2}
                label="Course Description"
                name="description"
                value={postData.description}
                eventHandler={handleInput}
              />
            </div>

            <div className="block">
              <Select
                label="Select Course Category"
                options={categoriesOption}
                name="course_category"
                value={postData.course_category}
                eventHandler={handleInput}
              />
            </div>
          </div>
          <Footer alignment="right">
            <Button text="Cancel" color="#9ca3af" onClick={handleCancel} />
            <Button text="Create" color="#325184" type="submit" />
          </Footer>
        </form>
      </div>
    </Container>
  );
};

export default CoursesCreate;
