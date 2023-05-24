import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserToken } from '@/src/shared/utils';

export const getCourseTrainee = createApi({
  reducerPath: 'getCourseTrainee',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Token ${getUserToken() ?? ''}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLearner: builder.query({
      query: ({ courseID, maxEntries }) => {
        return `course/${courseID}/trainee?max_entries=${maxEntries}`;
      },
    }),
  }),
});

export const { useGetLearnerQuery } = getCourseTrainee;
