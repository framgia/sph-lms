/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useEffect, useState } from 'react';
import { API_URL } from '@/src/shared/utils';
import { SelectOptionData } from '@/src/shared/components/Select';
import { useRouter } from 'next/router';

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
    const response = await fetch(`${API_URL}/course/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then();

    const result = await response.json();

    router.push(`/courses/${result.id}`);
  };

  const paths = [
    {
      text: 'Courses',
      url: '/courses'
    },
    {
      text: 'Create',
      url: '/courses/create'
    }
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`${API_URL}/course-category`);
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    void fetchData();
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
