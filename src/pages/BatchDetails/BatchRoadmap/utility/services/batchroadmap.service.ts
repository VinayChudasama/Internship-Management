import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../../shared/utility/services/axiosBaseQuery.service";
import { API_BASE_URL } from "../../../../../environments/environment";
import { IBatchRoadmap } from "../models/batchroadmap.model";

export const batchRoadmapApi = createApi({
  reducerPath: "batchRoadmapApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["BatchRoadmap"],
  endpoints: (builder) => ({
    // GET BatchRoadmap Data
    getBatchRoadmap: builder.query<IBatchRoadmap[], void>({
      query: () => ({ url: "/batchRoadmap", method: "GET" }),
      providesTags: ["BatchRoadmap"],
    }),
    // GET Batchroadmap by Id
    getBatchRoadmapById: builder.query<IBatchRoadmap, string>({
      query: (id: string) => ({
        url: `/batchRoadmap/${id}`,
        method: "GET",
      }),
      providesTags: ["BatchRoadmap"],
    }),
    // Add BatchRoadmap
    addBatchRoadmap: builder.mutation<IBatchRoadmap, IBatchRoadmap>({
      query: (batchRoadmap: IBatchRoadmap) => ({
        url: "/batchRoadmap",
        method: "POST",
        data: batchRoadmap,
      }),
      invalidatesTags: ["BatchRoadmap"],
    }),
    // UPDATE Batch Roadmap
    updateBatchRoadmap: builder.mutation<IBatchRoadmap, IBatchRoadmap>({
      query: ({ id, ...batchRoadmapData }) => ({
        url: `/batchRoadmap/${id}`,
        method: "PUT",
        data: batchRoadmapData,
      }),
      invalidatesTags: ["BatchRoadmap"],
    }),
    // DELETE Batch Roadmap
    deleteBatchRoadmap: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/batchRoadmap/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BatchRoadmap"],
    }),
  }),
});

export const {
  useGetBatchRoadmapQuery,
  useGetBatchRoadmapByIdQuery,
  useAddBatchRoadmapMutation,
  useUpdateBatchRoadmapMutation,
  useDeleteBatchRoadmapMutation,
} = batchRoadmapApi;
