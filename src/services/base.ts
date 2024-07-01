import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Entry, EntryType, EntriesApiTag } from '@/models/entry';
import { Category, CategoriesApiTag } from '@/models/category';
import { PaymentMethod, PaymentMethodsApiTag } from '@/models/paymentMethod';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173' }),
  tagTypes: [
    EntriesApiTag.Entries,
    CategoriesApiTag.Categories,
    PaymentMethodsApiTag.PaymentMethods,
  ],
  endpoints: (builder) => ({
    getBudgetEntries: builder.query<Entry[], void>({
      query: () => 'budget-entries',
      providesTags: [EntriesApiTag.Entries],
    }),
    getBudgetCategories: builder.query<Category[], void>({
      query: () => 'budget-categories',
      providesTags: [CategoriesApiTag.Categories],
    }),
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => 'payment-methods',
      providesTags: [PaymentMethodsApiTag.PaymentMethods],
    }),
    createBudgetEntry: builder.mutation<void, Omit<Entry, 'id' | 'entryType'>>({
      query: ({
        name,
        amount,
        category,
        frequency,
        dueDate,
        paymentMethod,
      }) => ({
        url: 'budget-entries',
        method: 'POST',
        body: {
          name,
          amount,
          category,
          entryType: EntryType.Budget,
          frequency,
          dueDate,
          paymentMethod,
        },
      }),
      invalidatesTags: [EntriesApiTag.Entries],
    }),
    createBudgetCategory: builder.mutation<void, Omit<Category, 'id'>>({
      query: ({ category }) => ({
        url: 'budget-categories',
        method: 'POST',
        body: {
          category,
        },
      }),
      invalidatesTags: [CategoriesApiTag.Categories],
    }),
    createPaymentMethod: builder.mutation<void, Omit<PaymentMethod, 'id'>>({
      query: ({ paymentMethod }) => ({
        url: 'payment-methods',
        method: 'POST',
        body: {
          paymentMethod,
        },
      }),
      invalidatesTags: [PaymentMethodsApiTag.PaymentMethods],
    }),
  }),
});

export const {
  useGetBudgetEntriesQuery,
  useGetBudgetCategoriesQuery,
  useGetPaymentMethodsQuery,
  useCreateBudgetEntryMutation,
  useCreateBudgetCategoryMutation,
  useCreatePaymentMethodMutation,
} = baseApi;
