/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  type CourseFormInput,
  type MultiSelectOptionData,
  alertError,
  alertSuccess,
  isRequestOk
} from '../utils';
import API from '@/src/apis';

export const useCreateCourse = (): any => {
  const router = useRouter();
  const [category, setCategory] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CourseFormInput>({
    defaultValues: {
      category: []
    }
  });

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

  const categoriesOption: MultiSelectOptionData[] = Object.entries(
    category
  ).map(([key, { id, name }]) => ({
    value: id,
    label: name
  }));

  const onSubmit: SubmitHandler<CourseFormInput> = async (
    data: CourseFormInput
  ): Promise<void> => {
    // Author and Company is still static due to verification of its point of origin (not discussed yet)
    const postData = {
      name: data.name,
      category: data.category.map((option) => option.value).join(','),
      description: data.description,
      company: 1,
      author: 1
    };

    try {
      const result = await API.post('/course/', postData);
      alertSuccess('Course Successfully Added');
      router.push(`/trainer/course/detail/${result.data.id}`);
    } catch (error) {
      alertError('Something Went Wrong');
    }
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

  return {
    register,
    control,
    handleSubmit,
    errors,
    paths,
    handleCancel,
    onSubmit,
    categoriesOption
  };
};
