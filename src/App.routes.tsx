import { Route, Routes } from "react-router-dom";
import { App_Routes } from "./core/utility/enums/core.enum";
import InternBatch from "./pages/InternBatch/InternBatch";
import Mentor from "./pages/Mentor/Mentor";
import Roadmap from "./pages/Roadmap/Roadmap";
import Tracker from "./pages/Tracker/Tracker";
import RoadmapForm from "./pages/Roadmap/component/RoadmapForm";
import RoadmapDetails from "./pages/RoadmapDetails/RoadmapDetails";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" />
      <Route path={App_Routes.INTERN_BATCH} element={<InternBatch />} />
      <Route path={App_Routes.MENTOR} element={<Mentor />} />

      <Route path={App_Routes.ROADMAP} element={<Roadmap />} />
      <Route path={App_Routes.ROADMAP_CREATE} element={<RoadmapForm />} />
      <Route path={App_Routes.ROADMAP_EDIT} element={<RoadmapForm />} />
      <Route path={App_Routes.ROADMAP_DETAILS} element={<RoadmapDetails />} />

      <Route path={App_Routes.TRACKER} element={<Tracker />} />
    </Routes>
  );
}