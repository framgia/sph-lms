/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react';
import type { SelectOptionData } from '@/src/shared/components/Select';
import { useRouter } from 'next/router';
import API from '@/src/apis';
import { alertError, alertSuccess, isRequestOk } from '../utils';

export const useCreateCourse = (): any => {
  const router = useRouter();
  const [category, setCategory] = useState([]);

  // created_by is set to admin for now, will update soon after configuration of aut
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    created_by: 1,
    course_category: ''
  });

  const handleInput = (e: any): void => {
    e.persist();
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleCancel = (): void => {
    router.back();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const result = await API.post('/course/', postData);
      alertSuccess('Course Successfully Added');
      router.push(`/trainer/course/detail/${result.data.id}`);
    } catch (error) {
      alertError('Something Went Wrong');
    }
  };

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

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const result = await API.get('/course-category');
        if (isRequestOk(result)) {
          setCategory(result.data);
        }
      } catch (error) {
        console.error(error);
        alert('something went wrong');
      }
    };

    fetchData();
  }, []);

  const categoriesOption: SelectOptionData[] = Object.entries(category).map(
    ([key, { id, name }]) => ({
      id,
      text: name
    })
  );

  return {
    handleInput,
    handleCancel,
    handleSubmit,
    postData,
    paths,
    categoriesOption
  };
};
