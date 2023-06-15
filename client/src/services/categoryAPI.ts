import { getUserToken } from '@/src/shared/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CategoryType {
  id: number;
  name: string;
}

export const getCategory = createApi({
  reducerPath: 'getCategory',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Token ${getUserToken() ?? ''}`);
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