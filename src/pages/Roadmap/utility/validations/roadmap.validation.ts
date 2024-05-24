import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  domain: Yup.string().trim().required("Domain is required"),
});
