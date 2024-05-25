import * as Yup from "yup";
import { roadmapDetailsFormValidationMessages } from "../constants/roadmapDetails.constant";

export const ValidationSchema = Yup.object({
  topics: Yup.array().of(
    Yup.object().shape({
      topicName: Yup.string()
        .required(roadmapDetailsFormValidationMessages.topicName)
        .trim(),
      subtopic: Yup.string()
        .required(roadmapDetailsFormValidationMessages.subtopic)
        .trim(),
    })
  ),
});
