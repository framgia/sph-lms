import { getUserToken } from '@/src/shared/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getCourse = createApi({
  reducerPath: 'getCourse',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Token ${getUserToken() ?? ''}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (courseID) => `course/${courseID}`,
    }),
    getCourses: builder.query({
      query: ({ search, page }) => {
        const searchParam = search ? `search=${search}` : '';
        const pageParam = page ? `&page=${page}` : '';
        return `course?${searchParam}${pageParam}`;
      },
    }),
  }),
});

export const { useGetCourseQuery, useGetCoursesQuery } = getCourse;