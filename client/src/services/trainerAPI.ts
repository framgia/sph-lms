import type { TrainerCourse, TrainerLearningPath } from '@/src/shared/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../shared/utils/helpers';

interface CourseList {
  results: TrainerCourse[];
  totalPages: number;
}

interface LearningPathList {
  results: TrainerLearningPath[];
  totalPages: number;
}

export const getTrainer = createApi({
  reducerPath: 'getTrainer',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const csrfToken = getCookie('csrftoken');
      headers.set('X-CSRFToken', csrfToken ?? '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrainerCourse: builder.query<CourseList, number>({
      query: (page) => ({
        url: 'trainer/course',
        params: {
          page,
        },
      }),
    }),
    getTrainerLearningPaths: builder.query<LearningPathList, { page: number; pageSize?: number }>({
      query: ({ page, pageSize }) => ({
        url: 'trainer/learning-path',
        params: {
          page,
          page_size: pageSize,
        },
      }),
    }),
  }),
});

export const { useGetTrainerCourseQuery, useGetTrainerLearningPathsQuery } = getTrainer;
