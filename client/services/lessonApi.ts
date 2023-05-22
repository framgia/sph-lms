import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserToken } from '@/src/shared/utils';

export const lessonApi = createApi({
  reducerPath: 'lessonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Token ${getUserToken() ?? ''}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLessonByCourseID: builder.query({
      query: (courseID) => `course/${courseID}/lesson`,
    }),
  }),
});

export const { useGetLessonByCourseIDQuery } = lessonApi;
