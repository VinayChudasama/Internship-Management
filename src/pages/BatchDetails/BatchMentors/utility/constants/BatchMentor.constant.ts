import GenerateId from "../../../../../shared/utility/helper/GenerateId";

export const addBatchMentorValidationMessages = {
  domain: "Domain is required",
  mentor: "Mentor is required",
};
export const initialBatchMentorDetailsValues = {
  domain: "",
  domainOwner: false,
  id: GenerateId(),
};
