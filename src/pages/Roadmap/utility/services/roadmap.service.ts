import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../../../environments/environment";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";
import { IRoadmapData } from "../models/roadmap.model";

export const roadmapApi = createApi({
  reducerPath: "roadmapApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["RoadmapList"],
  endpoints: (builder) => ({
    //GET Roadmap's
    getRoadMapData: builder.query<IRoadmapData[], void>({
      query: () => ({ url: "/roadmap", method: "GET" }),
      providesTags: ["RoadmapList"],
    }),
    // Add Roadmap Data
    addRoadMap: builder.mutation<IRoadmapData, IRoadmapData>({
      query: (roadmapData: IRoadmapData) => ({
        url: "/roadmap",
        method: "POST",
        data: roadmapData,
      }),
      invalidatesTags: ["RoadmapList"],
    }),
    // Delete Roadmap
    deleteRoadMap: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/roadmap/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoadmapList"],
    }),
    // Get Roadmap By Id
    getRoadmapById: builder.query<IRoadmapData, string>({
      query: (id: string) => ({
        url: `/roadmap/${id}`,
        method: "GET",
      }),
      providesTags: ["RoadmapList"],
    }),
    // Update Roadmap
    updateRoadmap: builder.mutation<IRoadmapData, IRoadmapData>({
      query: ({ id, ...roadmap }) => ({
        url: `/roadmap/${id}`,
        method: "PUT",
        data: roadmap,
      }),
      invalidatesTags: ["RoadmapList"],
    }),
  }),
});
// Get All Roadmap
export const {
  useGetRoadMapDataQuery,
  useAddRoadMapMutation,
  useDeleteRoadMapMutation,
  useGetRoadmapByIdQuery,
  useUpdateRoadmapMutation,
} = roadmapApi;
