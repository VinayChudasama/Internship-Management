import { createApi } from "@reduxjs/toolkit/query/react";
import { IMentor } from "../models/mentor.model";
import { API_BASE_URL } from "../../../../environments/environment";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";

export const mentorApi = createApi({
  reducerPath: "mentorApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["MentorsList", "Domain", "Designation"],
  endpoints: (builder) => ({
    getMentorData: builder.query<IMentor[], void>({
      query: () => ({ url: "/mentors", method: "GET" }),
      providesTags: ["MentorsList"],
    }),
    getDomain: builder.query({
      query: () => ({ url: "/domain", method: "GET" }),
      providesTags: ["Domain"],
    }),
    getDesignation: builder.query({
      query: () => ({ url: "/designation", method: "GET" }),
      providesTags: ["Designation"],
    }),
    addMentor: builder.mutation({
      query: (mentor) => ({
        url: "/mentors",
        method: "POST",
        body: mentor,
      }),
      invalidatesTags: ["MentorsList"],
    }),
    deleteMentorData: builder.mutation({
      query: (id: string) => ({
        url: `/mentors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MentorsList"],
    }),
    getMentorById: builder.query({
      query: (id) => ({
        url: `/mentors/${id}`,
        method: "GET",
      }),
      providesTags: ["MentorsList"],
    }),
    updateMentor: builder.mutation({
      query: ({ id, ...mentorDetail }) => ({
        url: `/mentors/${id}`,
        method: "PUT",
        body: mentorDetail,
      }),
      invalidatesTags: ["MentorsList"],
    }),
  }),
});
export const {
  useGetMentorDataQuery,
  useGetMentorByIdQuery,
  useGetDomainQuery,
  useGetDesignationQuery,
  useAddMentorMutation,
  useDeleteMentorDataMutation,
  useUpdateMentorMutation,
} = mentorApi;
