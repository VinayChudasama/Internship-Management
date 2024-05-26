import * as Yup from "yup";
import { addBatchMentorValidationMessages } from "../constants/BatchMentor.constant";

export const ValidationSchema = Yup.object().shape({
  domain: Yup.string().required(addBatchMentorValidationMessages.domain),
  mentorId: Yup.string().required(addBatchMentorValidationMessages.mentor),
});
