import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../../shared/utility/services/axiosBaseQuery.service";
import { API_BASE_URL } from "../../../../../environments/environment";
import { IBatchMentor } from "../models/batchMentor.model";
import BatchMentor from "../../BatchMentor";
import { IMentorData } from "../../../../Mentor/utility/models/mentor.model";

export const batchMentorApi = createApi({
  reducerPath: "batchMentorApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["BatchMentorList"],
  endpoints: (builder) => ({
    // GET BatchMentors Data
    getBatchMentor: builder.query<IBatchMentor[], void>({
      query: () => ({ url: "/batchMentor", method: "GET" }),
      providesTags: ["BatchMentorList"],
    }),
    // GET BatchMentor by Id
    getBatchMentorById: builder.query<IBatchMentor, string>({
      query: (id: string) => ({ url: `/batchMentor/${id}`, method: "GET" }),
      providesTags: ["BatchMentorList"],
    }),
    // ADD BatchMentor
    addBatchMentor: builder.mutation<IBatchMentor, IBatchMentor>({
      query: (batchMentorData) => ({
        url: "/batchMentor",
        method: "POST",
        data: batchMentorData,
      }),
      invalidatesTags: ["BatchMentorList"],
    }),
    // UPDATE Batch Mentor
    updateBatchMentor: builder.mutation<
      Object,
      { id: string; batchMentorData: Partial<IMentorData> }
    >({
      query: ({ id, batchMentorData }) => ({
        url: `/batchMentor/${id}`,
        method: "PUT",
        data: batchMentorData,
      }),
      invalidatesTags: ["BatchMentorList"],
    }),
    // DELETE Batch Mentor
    deleteBatchMentor: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/batchMentor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BatchMentorList"],
    }),
  }),
});

export const {
  useGetBatchMentorQuery,
  useGetBatchMentorByIdQuery,
  useAddBatchMentorMutation,
  useUpdateBatchMentorMutation,
  useDeleteBatchMentorMutation,
} = batchMentorApi;
