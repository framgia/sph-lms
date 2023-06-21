import type { TrainerCourse } from '@/src/shared/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CourseList {
  results: TrainerCourse[];
  totalPages: number;
}

export const getTrainer = createApi({
  reducerPath: 'getTrainer',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
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
  }),
});

export const { useGetTrainerCourseQuery } = getTrainer;
