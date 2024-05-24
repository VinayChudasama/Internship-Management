import GenerateId from "../../../../shared/utility/helper/GenerateId";
import { IRoadmapData } from "../models/roadmap.model";

export const initialFormValues: IRoadmapData = {
  id: GenerateId(),
  name: "",
  domain: "",
  totalDays: 0,
};
