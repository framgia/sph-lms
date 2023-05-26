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
      query: ({ courseId, isEnrolled, searchQuery, pageNumber }) => ({
        url: `course/${courseId}/trainee`,
        params: {
          is_enrolled: isEnrolled,
          search: searchQuery,
          page: pageNumber,
        },
      }),
    }),
    enrollLearner: builder.mutation({
      query: ({ courseId, postData }) => ({
        url: `course/${courseId}/trainee`,
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useGetLearnerQuery, useEnrollLearnerMutation } = getCourseTrainee;
