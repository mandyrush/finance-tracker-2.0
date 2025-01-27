import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Entry,
  EntryType,
  EntryFrequency,
  EntriesApiTag,
} from '@/models/entry';
import { Category, CategoriesApiTag } from '@/models/category';
import { PaymentMethod, PaymentMethodsApiTag } from '@/models/paymentMethod';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173' }),
  tagTypes: [
    EntriesApiTag.Entries,
    EntriesApiTag.Entry,
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
    getBudgetEntry: builder.query<Entry, number>({
      query: (id) => `budget-entries/${id}`,
      providesTags: (result, error, id) => [{ type: EntriesApiTag.Entry, id }],
    }),
    createBudgetEntry: builder.mutation<
      void,
      {
        name: string;
        amount: string;
        category: string;
        frequency: EntryFrequency;
        dueDate: string;
        paymentMethod: string;
      }
    >({
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
    updateBudgetEntry: builder.mutation<
      void,
      {
        id: number;
        name: string;
        amount: string;
        category: string;
        frequency: EntryFrequency;
        dueDate: string;
        paymentMethod: string;
      }
    >({
      query: ({
        id,
        name,
        amount,
        category,
        frequency,
        dueDate,
        paymentMethod,
      }) => ({
        url: `budget-entries/${id}`,
        method: 'PUT',
        body: {
          id,
          name,
          amount,
          category,
          entryType: EntryType.Budget,
          frequency,
          dueDate,
          paymentMethod,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: EntriesApiTag.Entries },
        { type: EntriesApiTag.Entry, id: arg.id },
      ],
    }),
    createBudgetCategory: builder.mutation<Category, Omit<Category, 'id'>>({
      query: ({ name }) => ({
        url: 'budget-categories',
        method: 'POST',
        body: {
          name,
        },
      }),
      invalidatesTags: [CategoriesApiTag.Categories],
    }),
    createPaymentMethod: builder.mutation<
      PaymentMethod,
      Omit<PaymentMethod, 'id'>
    >({
      query: ({ name }) => ({
        url: 'payment-methods',
        method: 'POST',
        body: {
          name,
        },
      }),
      invalidatesTags: [PaymentMethodsApiTag.PaymentMethods],
    }),
    deleteBudgetEntry: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `budget-entries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [EntriesApiTag.Entries],
    }),
  }),
});

export const {
  useGetBudgetEntriesQuery,
  useGetBudgetEntryQuery,
  useGetBudgetCategoriesQuery,
  useGetPaymentMethodsQuery,
  useCreateBudgetEntryMutation,
  useUpdateBudgetEntryMutation,
  useCreateBudgetCategoryMutation,
  useCreatePaymentMethodMutation,
  useDeleteBudgetEntryMutation,
} = baseApi;
