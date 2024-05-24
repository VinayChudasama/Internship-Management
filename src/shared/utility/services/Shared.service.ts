import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery.service";
import { API_BASE_URL } from "../../../environments/environment";
import { IDesignation, IDomains } from "../models/Shared.model";

export const sharedApi = createApi({
  reducerPath: "sharedApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Domain", "Designation"],
  endpoints: (builder) => ({
    // GET Domains
    getDomain: builder.query<IDomains[], void>({
      query: () => ({ url: "/domain", method: "GET" }),
      providesTags: ["Domain"],
    }),
    // GET Designation
    getDesignation: builder.query<IDesignation[], void>({
      query: () => ({ url: "/designation", method: "GET" }),
      providesTags: ["Designation"],
    }),
  }),
});

export const { useGetDomainQuery, useGetDesignationQuery } = sharedApi;
