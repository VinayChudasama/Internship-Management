import { Route, Routes } from "react-router-dom";
import { App_Routes } from "./core/utility/enums/core.enum";
import InternBatch from "./pages/InternBatch/InternBatch";
import Mentor from "./pages/Mentor/Mentor";
import Roadmap from "./pages/Roadmap/Roadmap";
import Tracker from "./pages/Tracker/Tracker";
import RoadmapForm from "./pages/Roadmap/component/RoadmapForm";
import RoadmapDetails from "./pages/RoadmapDetails/RoadmapDetails";
import RoadmapDetailsForm from "./pages/RoadmapDetails/components/RoadmapDetailsForm";
import InternBatchForm from "./pages/InternBatch/component/InternBatchForm";
import BatchDetails from "./pages/BatchDetails/BatchDetails";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" />
      <Route path={App_Routes.INTERN_BATCH} element={<InternBatch />} />
      <Route
        path={App_Routes.INTERN_BATCH_CREATE}
        element={<InternBatchForm />}
      />
      <Route
        path={App_Routes.INTERN_BATCH_EDIT}
        element={<InternBatchForm />}
      />
      <Route path={App_Routes.BATCH_ROADMAP_EDIT} element={<BatchDetails />} />
      <Route path={App_Routes.BATCH_DETAIL} element={<BatchDetails />} />
      <Route path={App_Routes.MENTOR} element={<Mentor />} />

      <Route path={App_Routes.ROADMAP} element={<Roadmap />} />
      <Route path={App_Routes.ROADMAP_CREATE} element={<RoadmapForm />} />
      <Route path={App_Routes.ROADMAP_EDIT} element={<RoadmapForm />} />
      <Route path={App_Routes.ROADMAP_DETAILS} element={<RoadmapDetails />} />
      <Route
        path={App_Routes.ROADMAP_DETAILS_CREATE}
        element={<RoadmapDetailsForm />}
      />
      <Route
        path={App_Routes.ROADMAP_DETAILS_EDIT}
        element={<RoadmapDetailsForm />}
      />

      <Route path={App_Routes.TRACKER} element={<Tracker />} />
    </Routes>
  );
}
