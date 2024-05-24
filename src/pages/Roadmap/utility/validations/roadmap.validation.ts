import * as Yup from "yup";
import { roadmapFormValidationMessages } from "../constants/Roadmap.constant";

export const ValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required(roadmapFormValidationMessages.name),
  domain: Yup.string().trim().required(roadmapFormValidationMessages.domain),
});
