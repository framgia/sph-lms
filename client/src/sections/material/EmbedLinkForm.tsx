import React, { Fragment } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { IsActiveProps, MaterialFormInput } from '@/src/shared/utils';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import DivCollapse from '@/src/shared/components/Collapse/DivCollapse';
import RFTextField from '@/src/shared/components/ReactForm/RFTextField';
import RFSelectField from '@/src/shared/components/ReactForm/RFSelectField';
import Button from '@/src/shared/components/Button';

const EmbedLinkForm: React.FunctionComponent<IsActiveProps> = ({
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

  const folder = [
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

  const coureses = [
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
          <h2 className="text-md text-blue-900 mb-5">Embed a Web Page</h2>

          <RFInputField
            label="Name"
            {...register('name', { required: true, minLength: 5 })}
            error={
              errors.name !== undefined &&
              'This field is required and must have at least 5 characters'
            }
          />

          <RFInputField
            label="Youtube URL"
            placeholder="https://"
            {...register('file', {
              required: true,
              pattern: /^(?!.*youtube).*https:\/\//i
            })}
            error={
              errors.file !== undefined &&
              'This field is required and must be a web page'
            }
          />

          <DivCollapse label="Advance Option">
            <RFTextField
              label="Description"
              {...register('description', { minLength: 5 })}
              error={
                errors.description !== undefined &&
                'This field is not required but should have at least 5 characters'
              }
            />

            <RFSelectField
              label="Assign to Folder"
              id="directory"
              options={folder}
              {...register('directory', { required: true })}
              error={errors.directory !== undefined && 'This field is required'}
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
              options={coureses}
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

export default EmbedLinkForm;
