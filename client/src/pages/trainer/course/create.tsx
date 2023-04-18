/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { Fragment, useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';
import {
  type CourseFormInput,
  alertError,
  alertSuccess,
  isRequestOk
} from '@/src/shared/utils';
import { MultiSelect } from 'react-multi-select-component';
import API from '@/src/apis';
import type { SelectOptionData } from '@/src/shared/components/Select';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import RFTextField from '@/src/shared/components/ReactForm/RFTextField';

const CoursesCreate: React.FC = () => {
  // const {
  //   handleInput,
  //   handleCancel,
  //   handleSubmit,
  //   postData,
  //   paths,
  //   categoriesOption
  // } = useCreateCourse();
  const router = useRouter();
  const [selected, setSelected] = useState<SelectOptionData[]>([]);
  const [category, setCategory] = useState([]);

  const paths = [
    {
      text: 'Courses',
      url: '/courses'
    },
    {
      text: 'Create',
      url: router.asPath
    }
  ];

  const handleCancel = (): void => {
    router.back();
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const result = await API.get('/category');
        if (isRequestOk(result)) {
          setCategory(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.error(error);
        alert('something went wrong');
      }
    };

    void fetchData();
  }, []);

  const categoriesOption: SelectOptionData[] = Object.entries(category).map(
    ([key, { id, name }]) => ({
      value: id,
      label: name
    })
  );

  // SELECTED CATEGORIES DATA
  // console.log(selected.map((option) => option.value).join(','));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CourseFormInput>({
    defaultValues: {
      category: [] // set initial value to empty array
    }
  });

  const onSubmit: SubmitHandler<CourseFormInput> = async (
    data: CourseFormInput
  ): Promise<void> => {
    // data.category = data.category.map((option) => option.value).join(',');
    // console.log(data);

    // Author and Company is still static due to verification of its point of origin (not discussed yet)
    const postData = {
      name: data.name,
      category: data.category.map((option) => option.value).join(','),
      description: data.description,
      company: 1,
      author: 1
    };

    console.log(postData);

    try {
      const result = await API.post('/course/', postData);
      alertSuccess('Course Successfully Added');
      router.push(`/trainer/course/detail/${result.data.id}`);
    } catch (error) {
      alertError('Something Went Wrong');
    }
  };

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <Container>
        <Breadcrumbs paths={paths} />
        {/* <div className="flex flex-col mt-10">
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
        </div> */}

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

        {/* <form onSubmit={handleSubmit(onSubmit)}>
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

          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-5">
            Log in
          </button>
        </form> */}
      </Container>
    </Fragment>
  );
};

export default CoursesCreate;
