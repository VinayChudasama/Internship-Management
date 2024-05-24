import GenerateId from "../../../../shared/utility/helper/GenerateId";
import { IRoadmapData } from "../models/roadmap.model";

const initialFormValues: IRoadmapData = {
  id: GenerateId(),
  name: "",
  domain: "",
  totalDays: 0,
};
const roadmapFormValidationMessages = {
  name: "Name is required",
  domain: "Domain is required",
};

export { initialFormValues, roadmapFormValidationMessages };
