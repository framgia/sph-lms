import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../shared/utils/helpers';

interface CategoryType {
  id: number;
  name: string;
}

export const getCategory = createApi({
  reducerPath: 'getCategory',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const csrfToken = getCookie('csrftoken');
      headers.set('X-CSRFToken', csrfToken ?? '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getCategory: builder.query<CategoryType[], void>({
      query: () => 'category/',
    }),
  }),
});

export const { useGetCategoryQuery } = getCategory;
