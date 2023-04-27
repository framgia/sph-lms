import React, { Fragment } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/src/shared/components/Button';
import DivCollapse from '@/src/shared/components/Collapse/DivCollapse';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import RFSelectField from '@/src/shared/components/ReactForm/RFSelectField';
import RFTextField from '@/src/shared/components/ReactForm/RFTextField';
import type { IsActiveProps, MaterialFormInput } from '@/src/shared/utils';

const SingleFileForm: React.FunctionComponent<IsActiveProps> = ({
  isActive
}: IsActiveProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MaterialFormInput>();

  const onSubmit: SubmitHandler<MaterialFormInput> = async (
    data: MaterialFormInput
  ): Promise<void> => {
    console.log(data);
  };

  const folders = [
    { value: '0', label: 'Nothing Selected' },
    { value: '1', label: 'Example Folder 1' },
    { value: '2', label: 'Example Folder 2' },
    { value: '3', label: 'Example Folder 3' }
  ];

  const categories = [
    { value: '0', label: 'Nothing Selected' },
    { value: '1', label: 'Example Category 1' },
    { value: '2', label: 'Example Category 2' },
    { value: '3', label: 'Example Category 3' }
  ];

  const courses = [
    { value: '0', label: 'Nothing Selected' },
    { value: '1', label: 'Example Course 1' },
    { value: '2', label: 'Example Course 2' },
    { value: '3', label: 'Example Course 3' }
  ];

  return (
    <Fragment>
      <div
        className={`p-4 max-h-[800px] overflow-y-scroll ${
          isActive ? 'block' : 'hidden'
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <h2 className="text-md text-blue-900 mb-5">Upload a File</h2>

            <input
              type="file"
              {...register('link', { required: true })}
              id="link"
            />

            {errors.link && (
              <div className="text-red-700 rounded relative" role="alert">
                <span className="block sm:inline text-sm">
                  This field is required
                </span>
              </div>
            )}
          </div>

          <RFInputField
            label="Document Name"
            {...register('name', { required: true, minLength: 5 })}
            error={
              !!errors.name &&
              'This field is required and must have at least 5 characters'
            }
          />

          <DivCollapse label="Advance Option">
            <RFTextField
              label="Description"
              {...register('description', { minLength: 5 })}
              error={
                !!errors.description &&
                'This field is not required but should have at least 5 characters'
              }
            />

            <RFSelectField
              label="Assign to Folder"
              id="directory"
              options={folders}
              {...register('directory', { required: true })}
              error={!!errors.directory && 'This field is required'}
            />

            <RFSelectField
              label="Category"
              id="category"
              options={categories}
              {...register('category')}
            />

            <RFSelectField
              label="Assign to Course"
              id="course"
              options={courses}
              {...register('course')}
            />
          </DivCollapse>

          <div className="flex justify-end">
            <Button text="Create" color="bg-lightBlue" type="submit" />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SingleFileForm;
