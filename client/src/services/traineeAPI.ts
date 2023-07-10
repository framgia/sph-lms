/* eslint-disable @typescript-eslint/indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../shared/utils/helpers';

export const getCourseTrainee = createApi({
  reducerPath: 'getCourseTrainee',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const csrfToken = getCookie('csrftoken');
      headers.set('X-CSRFToken', csrfToken ?? '');
      return headers;
    },
  }),
  tagTypes: ['CourseTrainee', 'LearningPathTrainee', 'TrainerTrainee', 'TraineeCourses'],
  endpoints: (builder) => ({
    getLearner: builder.query({
      query: ({ courseId, isEnrolled, searchQuery, pageNumber, selectedSortOption }) => ({
        url: `course/${courseId}/trainee`,
        params: {
          is_enrolled: isEnrolled,
          search: searchQuery,
          page: pageNumber,
          selectedSortOption,
        },
      }),
      providesTags: ['CourseTrainee'],
    }),
    getTraineeCourses: builder.query({
      query: ({ search, pageNumber, sort, pageSize }) => ({
        url: 'trainee/course',
        params: {
          search,
          page: pageNumber,
          sort,
          page_size: pageSize,
        },
      }),
      providesTags: ['TraineeCourses'],
    }),
    getLearningPathLearner: builder.query({
      query: ({ courseId, isEnrolled, searchQuery, pageNumber, selectedSortOption }) => ({
        url: `learning-path/${courseId}/trainee`,
        params: {
          is_enrolled: isEnrolled,
          search: searchQuery,
          page: pageNumber,
          sort_by: selectedSortOption,
        },
      }),
      providesTags: ['LearningPathTrainee'],
    }),
    getTrainerTrainees: builder.query<
      any,
      { searchQuery?: string; pageNumber?: number; pageSize?: number; sort?: string }
    >({
      query: ({ searchQuery, pageNumber, pageSize, sort }) => ({
        url: 'trainer/trainees',
        params: {
          search: searchQuery,
          page: pageNumber,
          page_size: pageSize,
          sort,
        },
      }),
      providesTags: ['TrainerTrainee'],
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
      invalidatesTags: ['CourseTrainee', 'TrainerTrainee'],
    }),
    enrollLearningPathLearner: builder.mutation({
      query: ({ courseId, postData }) => ({
        url: `learning-path/${courseId}/trainee`,
        method: 'POST',
        body: postData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['LearningPathTrainee', 'TrainerTrainee'],
    }),
  }),
});

export const {
  useGetTraineeCoursesQuery,
  useGetLearnerQuery,
  useGetLearningPathLearnerQuery,
  useGetTrainerTraineesQuery,
  useEnrollLearnerMutation,
  useEnrollLearningPathLearnerMutation,
} = getCourseTrainee;
