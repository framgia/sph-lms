import React, { Fragment } from 'react';
import { useCreateCourse } from '@/src/shared/hooks/useCreateCourse';
import Container from '@/src/shared/layouts/Container';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import RFTextField from '@/src/shared/components/ReactForm/RFTextField';
import { Controller } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';
import Footer from '@/src/shared/components/Footer';
import Button from '@/src/shared/components/Button';

const CoursesCreate: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    errors,
    paths,
    handleCancel,
    onSubmit,
    categoriesOption
  } = useCreateCourse();

  return (
    <Fragment>
      <Container>
        <Breadcrumbs paths={paths} />

        <div className="flex flex-col mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-2xl text-sky-700">Create New Course</div>
            <div className="mt-12 w-[500px]">
              <RFInputField
                label="Name"
                {...register('name', { required: true, minLength: 3 })}
                error={
                  errors.name !== undefined &&
                  'This field is required and must have at least 3 characters'
                }
              />

              <RFTextField
                label="Description"
                {...register('description', { minLength: 5 })}
                error={
                  errors.description !== undefined &&
                  'Must be at least 5 characters'
                }
              />

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Category
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ validate: (value) => value.length > 0 }}
                render={({ field }) => (
                  <MultiSelect
                    options={categoriesOption}
                    value={field.value}
                    onChange={field.onChange}
                    labelledBy="Select"
                  />
                )}
              />
              {errors.category !== undefined && (
                <span className="text-red-500">
                  Please select at least one category
                </span>
              )}
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
