import { createApi } from "@reduxjs/toolkit/query/react";
import { IMentorData } from "../models/mentor.model";
import { API_BASE_URL } from "../../../../environments/environment";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";

export const mentorApi = createApi({
  reducerPath: "mentorApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["MentorsList", "Domain", "Designation"],
  endpoints: (builder) => ({
    getMentorData: builder.query<IMentorData[], void>({
      query: () => ({ url: "/mentors", method: "GET" }),
      providesTags: ["MentorsList"],
    }),
    addMentor: builder.mutation<IMentorData, IMentorData>({
      query: (mentorData: IMentorData) => ({
        url: "/mentors",
        method: "POST",
        data: mentorData,
      }),
      invalidatesTags: ["MentorsList"],
    }),
    deleteMentor: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/mentors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MentorsList"],
    }),
    getMentorById: builder.query<IMentorData, string>({
      query: (id: string) => ({
        url: `/mentors/${id}`,
        method: "GET",
      }),
      providesTags: ["MentorsList"],
    }),
    updateMentor: builder.mutation<IMentorData, IMentorData>({
      query: ({ id, ...mentorData }) => ({
        url: `/mentors/${id}`,
        method: "PUT",
        data: mentorData,
      }),
      invalidatesTags: ["MentorsList"],
    }),
  }),
});
export const {
  useGetMentorDataQuery,
  useGetMentorByIdQuery,
  useAddMentorMutation,
  useDeleteMentorMutation,
  useUpdateMentorMutation,
} = mentorApi;
