import * as yup from "yup";
import {
  addMentorDetailsValidationMessages,
  addMentorDetailsValidationRegex,
} from "../constants/Mentor.constant";
export const userProfileValidationSchema = yup.object({
  firstName: yup
    .string()
    .required(addMentorDetailsValidationMessages.firstNameRequired),
  lastName: yup
    .string()
    .required(addMentorDetailsValidationMessages.lastNameRequired),
  email: yup
    .string()
    .required(addMentorDetailsValidationMessages.emailRequired)
    .matches(
      addMentorDetailsValidationRegex.emailRegex,
      addMentorDetailsValidationMessages.emailInvalid
    ),
  domain: yup
    .string()
    .required(addMentorDetailsValidationMessages.domainRequired),
  phone: yup
    .string()
    .required(addMentorDetailsValidationMessages.phoneRequired)
    .matches(
      addMentorDetailsValidationRegex.phoneNumberPattern,
      addMentorDetailsValidationMessages.phoneInvalid
    ),
  designation: yup
    .string()
    .required(addMentorDetailsValidationMessages.designationRequired),
});
