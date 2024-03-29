/* eslint-disable @typescript-eslint/indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../shared/utils/helpers';

export const getLearningPath = createApi({
  reducerPath: 'getLearningPath',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const csrfToken = getCookie('csrftoken');
      headers.set('X-CSRFToken', csrfToken ?? '');
      return headers;
    },
  }),
  tagTypes: ['LearningPath'],
  endpoints: (builder) => ({
    getLearningPaths: builder.query<
      any,
      {
        page: number;
        pageSize?: number;
        isActive?: boolean;
        search?: string;
        isTrainee?: boolean;
        sort?: string;
      }
    >({
      query: ({ page, pageSize, isActive, search, sort }) => ({
        url: 'learning-path/',
        params: {
          page,
          page_size: pageSize,
          is_active: isActive,
          search,
          sort,
        },
      }),
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
      providesTags: ['LearningPath'],
    }),

    updateLearningPath: builder.mutation({
      query: ({ id, data }) => ({
        url: `learning-paths/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['LearningPath'],
    }),
  }),
});

export const {
  useGetLearningPathsQuery,
  useCreateLearningPathMutation,
  useGetLearningPathQuery,
  useUpdateLearningPathMutation,
} = getLearningPath;
