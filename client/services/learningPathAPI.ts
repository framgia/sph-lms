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
  tagTypes: ['LearningPath'],
  endpoints: (builder) => ({
    getLearningPaths: builder.query<any, { page: number; pageSize?: number; isActive?: boolean }>({
      query: ({ page, pageSize, isActive }) => {
        const pageParam = `page=${page}`;
        const pageSizeParam = pageSize ? `&page_size=${pageSize}` : '';
        const statusParam = isActive !== undefined ? `&is_active=${isActive}` : '';
        return `learning-path?${pageParam}${pageSizeParam}${statusParam}`;
      },
      providesTags: ['LearningPath'],
    }),
    createLearningPath: builder.mutation({
      query: (data) => ({
        url: 'learning-path/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['LearningPath'],
    }),
  }),
});

export const { useGetLearningPathsQuery, useCreateLearningPathMutation } = getLearningPath;
