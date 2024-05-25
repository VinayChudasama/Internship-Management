import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { roadmapApi } from "../pages/Roadmap/utility/services/roadmap.service";
import { sharedApi } from "../shared/utility/services/Shared.service";
import { roadmapDetailsApi } from "../pages/RoadmapDetails/utility/services/roadmapdetails.service";
import { internBatchApi } from "../pages/InternBatch/utility/services/internBatch.service";
import { mentorApi } from "../pages/Mentor/utility/services/mentor.service";

export const store = configureStore({
  reducer: {
    [roadmapApi.reducerPath]: roadmapApi.reducer,
    [sharedApi.reducerPath]: sharedApi.reducer,
    [roadmapDetailsApi.reducerPath]: roadmapDetailsApi.reducer,
    [internBatchApi.reducerPath]: internBatchApi.reducer,
    [mentorApi.reducerPath]: mentorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roadmapApi.middleware,
      sharedApi.middleware,
      roadmapDetailsApi.middleware,
      internBatchApi.middleware,
      mentorApi.middleware
    ),
});
type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
