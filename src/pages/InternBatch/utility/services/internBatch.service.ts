import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";
import { API_BASE_URL } from "../../../../environments/environment";
import { IInternBatch } from "../models/internbatch.model";

export const internBatchApi = createApi({
  reducerPath: "internBatchApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["InternBatchList"],
  endpoints: (builder) => ({
    // GET BatchList Data
    getBatchListData: builder.query<IInternBatch[], void>({
      query: () => ({ url: "/internshipBatch", method: "GET" }),
      providesTags: ["InternBatchList"],
    }),
    // GET BatchList Data by id
    getBatchListById: builder.query<IInternBatch, string>({
      query: (id: string) => ({
        url: `/internshipBatch/${id}`,
        method: "GET",
      }),
      providesTags: ["InternBatchList"],
    }),
    // ADD BatchList Data
    addBatchList: builder.mutation<IInternBatch, IInternBatch>({
      query: (batchListData: IInternBatch) => ({
        url: "/internshipBatch",
        method: "POST",
        data: batchListData,
      }),
      invalidatesTags: ["InternBatchList"],
    }),
    // UPDATE BatchList Data
    updateBatchList: builder.mutation<IInternBatch, IInternBatch>({
      query: ({ id, ...batchListData }) => ({
        url: `/internshipBatch/${id}`,
        method: "PUT",
        data: batchListData,
      }),
      invalidatesTags: ["InternBatchList"],
    }),
    // DELETE BatchList Data
    deleteBatchList: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/internshipBatch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InternBatchList"],
    }),
  }),
});

export const {
  useGetBatchListDataQuery,
  useGetBatchListByIdQuery,
  useAddBatchListMutation,
  useDeleteBatchListMutation,
  useUpdateBatchListMutation,
} = internBatchApi;
