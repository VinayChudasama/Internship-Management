import GenerateId from "../../../../shared/utility/helper/GenerateId";

export const addMentorDetailsValidationMessages = {
  firstNameRequired: "FirstName is required",
  lastNameRequired: "LastName is required",
  emailInvalid: "Email is not valid",
  emailRequired: "Email is required",
  domainRequired: "Domain is required",
  phoneRequired: "Phone number is required",
  phoneInvalid: "Phone number is not valid",
  designationRequired: "Designation is required",
};
export const addMentorDetailsValidationRegex = {
  emailRegex: /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}$/,
  phoneNumberPattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
};
export const initialMentorDetailsValues = {
  id: GenerateId(),
  firstName: "",
  lastName: "",
  email: "",
  domain: "",
  phone: "",
  designation: "",
};
