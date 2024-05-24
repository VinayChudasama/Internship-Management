import GenerateId from "../../../../shared/utility/helper/GenerateId";
import { IInternBatch } from "../models/internbatch.model";

const initialFormValues: IInternBatch = {
  id: GenerateId(),
  batchname: "",
  startdate: "",
  enddate: "",
  status: "Not-Started",
};
const internBatchFormValidationMessages = {
  batchname: "Batch Name is required",
  startdate: "Startdate is required",
  enddate: "Enddate is required",
};

const statusData = ["Not-Started", "In Progress", "Completed"];

export { initialFormValues, internBatchFormValidationMessages, statusData };
