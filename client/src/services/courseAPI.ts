import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../shared/utils/helpers';

export const getCourse = createApi({
  reducerPath: 'getCourse',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const csrfToken = getCookie('csrftoken');
      headers.set('X-CSRFToken', csrfToken ?? '');
      return headers;
    },
  }),
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (courseID) => `course/${courseID}`,
      providesTags: ['Course'],
    }),
    getCourses: builder.query({
      query: ({ search, page, pageSize }) => {
        const pageParam = page ? `page=${page}` : '';
        const searchParam = search ? `&search=${search}` : '';
        const pageSizeParam = pageSize ? `&page_size=${pageSize}` : '';
        return `course/?${pageParam}${searchParam}${pageSizeParam}`;
      },
      providesTags: ['Course'],
    }),
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: 'course/',
        method: 'POST',
        body: courseData,
      }),
      invalidatesTags: ['Course'],
    }),
    deleteCourse: builder.mutation({
      query: ({ courseID, courseData }) => ({
        url: `course/${courseID}`,
        method: 'DELETE',
        body: courseData,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: ({ courseID, courseData }) => ({
        url: `course/${courseID}`,
        method: 'PUT',
        body: courseData,
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = getCourse;
