/* eslint-disable @typescript-eslint/indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getLearningPath = createApi({
  reducerPath: 'getLearningPath',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['LearningPath'],
  endpoints: (builder) => ({
    getLearningPaths: builder.query<
      any,
      { page: number; pageSize?: number; isActive?: boolean; search?: string }
    >({
      query: ({ page, pageSize, isActive, search }) => {
        const pageParam = `page=${page}`;
        const pageSizeParam = pageSize ? `&page_size=${pageSize}` : '';
        const statusParam = isActive !== undefined ? `&is_active=${isActive}` : '';
        const searchParam = search ? `&search=${search}` : '';
        return `learning-path?${pageParam}${pageSizeParam}${statusParam}${searchParam}`;
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

    getLearningPath: builder.query({
      query: (id) => `learning-paths/${id}`,
    }),
  }),
});

export const { useGetLearningPathsQuery, useCreateLearningPathMutation, useGetLearningPathQuery } =
  getLearningPath;
