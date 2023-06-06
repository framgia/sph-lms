import { getUserToken } from '@/src/shared/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getLearningPath = createApi({
  reducerPath: 'getLearningPath',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Token ${getUserToken() ?? ''}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createLearningPath: builder.mutation({
      query: (data) => ({
        url: 'learning-path/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateLearningPathMutation } = getLearningPath;
