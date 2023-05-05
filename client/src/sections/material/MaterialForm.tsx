import React, { Fragment, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/src/shared/components/Button';
import DivCollapse from '@/src/shared/components/Collapse/DivCollapse';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import RFSelectField from '@/src/shared/components/ReactForm/RFSelectField';
import RFTextField from '@/src/shared/components/ReactForm/RFTextField';
import type { MaterialFormInput } from '@/src/shared/utils';

interface TestingProps {
  activeField: string;
}

const MaterialForm: React.FunctionComponent<TestingProps> = ({
  activeField
}: TestingProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MaterialFormInput>();

  const onSubmit: SubmitHandler<MaterialFormInput> = async (
    data: MaterialFormInput
  ): Promise<void> => {
    reset();
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

  const selectFields = [
    {
      label: 'Assign to Folder',
      id: 'directory',
      options: folders
    },
    {
      label: 'Assign to Category',
      id: 'category',
      options: categories
    },
    {
      label: 'Assign to Course',
      id: 'course',
      options: courses
    }
  ];

  useEffect(() => {
    reset();
  }, [activeField, reset]);

  return (
    <Fragment>
      <div className="p-4 max-h-[800px] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            {activeField === 'singleFile' && (
              <div>
                <h2 className="text-md text-blue-900 mb-5">Upload a File</h2>

                <RFInputField
                  className="border-none"
                  type="file"
                  {...register('link', { required: true })}
                  error={!!errors.link && 'This field is required'}
                />

                <RFInputField
                  label="Document Name"
                  {...register('name', { required: true, minLength: 5 })}
                  error={
                    !!errors.name &&
                    'This field is required and must have at least 5 characters'
                  }
                />
              </div>
            )}

            {activeField === 'youTube' && (
              <div>
                <h2 className="text-md text-blue-900 mb-5">
                  Add a YouTube Video
                </h2>

                <RFInputField
                  label="Video Name"
                  {...register('name', { required: true, minLength: 5 })}
                  error={
                    !!errors.name &&
                    'This field is required and must have at least 5 characters'
                  }
                />

                <RFInputField
                  label="Youtube URL"
                  placeholder="e.g. https://www.youtube.com/watch?v=HGl75kurxok"
                  {...register('link', {
                    required: true,
                    pattern: /www.youtube.com/
                  })}
                  error={
                    !!errors.link &&
                    'This field is required and must be a youtube url'
                  }
                />
              </div>
            )}

            {activeField === 'embedLink' && (
              <div>
                <h2 className="text-md text-blue-900 mb-5">Embed a Web Page</h2>

                <RFInputField
                  label="Name"
                  {...register('name', { required: true, minLength: 5 })}
                  error={
                    !!errors.name &&
                    'This field is required and must have at least 5 characters'
                  }
                />

                <RFInputField
                  label="Youtube URL"
                  placeholder="https://"
                  {...register('link', {
                    required: true,
                    pattern: /^(?!.*youtube).*https:\/\//i
                  })}
                  error={
                    !!errors.link &&
                    'This field is required and must be a web page'
                  }
                />
              </div>
            )}
          </div>

          <DivCollapse label="Advance Option">
            <RFTextField
              label="Description"
              {...register('description', { minLength: 5 })}
              error={
                !!errors.description &&
                'This field is not required but should have at least 5 characters'
              }
            />

            {selectFields.map((item, index) => (
              <RFSelectField
                key={index}
                label={item.label}
                id={item.id}
                options={item.options}
                {...register(item.id as 'directory' | 'category' | 'course')}
              />
            ))}
          </DivCollapse>
          <div className="flex justify-end">
            <Button text="Create" color="bg-lightBlue" type="submit" />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default MaterialForm;
