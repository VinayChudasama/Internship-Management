import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../../../environments/environment";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";
import { IRoadmapDetails } from "../models/roadmapdetails.model";

export const roadmapDetailsApi = createApi({
  reducerPath: "roadmapDetailsApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["RoadmapDetails"],
  endpoints: (builder) => ({
    // GET Roadmap Details
    getRoadMapDetails: builder.query<IRoadmapDetails[], void>({
      query: () => ({ url: "/roadmapDetails", method: "GET" }),
      providesTags: ["RoadmapDetails"],
    }),
    // ADD Roadmap Details
    addRoadMapDetails: builder.mutation<IRoadmapDetails, IRoadmapDetails>({
      query: (roadmapData: IRoadmapDetails) => ({
        url: "/roadmapDetails",
        method: "POST",
        data: roadmapData,
      }),
      invalidatesTags: ["RoadmapDetails"],
    }),
    // GET Roadmap Details by Id
    getRoadmapDetailsById: builder.query<IRoadmapDetails, string>({
      query: (id: string) => ({
        url: `/roadmapDetails/${id}`,
        method: "GET",
      }),
      providesTags: ["RoadmapDetails"],
    }),
    // UPDATE Roadmap Details
    updateRoadmapDetails: builder.mutation<IRoadmapDetails, IRoadmapDetails>({
      query: ({ id, ...roadmapDetails }) => ({
        url: `/roadmapDetails/${id}`,
        method: "PUT",
        data: roadmapDetails,
      }),
      invalidatesTags: ["RoadmapDetails"],
    }),
    // DELETE Roadmap Details
    deleteRoadmapDetails: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/roadmapDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoadmapDetails"],
    }),
  }),
});
export const {
  useGetRoadMapDetailsQuery,
  useAddRoadMapDetailsMutation,
  useGetRoadmapDetailsByIdQuery,
  useUpdateRoadmapDetailsMutation,
  useDeleteRoadmapDetailsMutation,
} = roadmapDetailsApi;
