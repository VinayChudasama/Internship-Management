import GenerateId from "../../../../shared/utility/helper/GenerateId";
import { IRoadmapDetails } from "../models/roadmapdetails.model";

const initialFormValues = (roadmapId: string, day: number) => {
  const formValues: IRoadmapDetails = {
    id: GenerateId(),
    roadmapId: roadmapId,
    day: `Day ${day}`,
    topics: [
      {
        id: GenerateId(),
        topicName: "",
        subtopic: "",
        duration: "",
      },
    ],
  };
  return formValues;
};

const roadmapDetailsFormValidationMessages = {
  topicName: "Topic Name is required",
  subtopic: "Subtopic is required",
};

const duration = ["15m", "30m", "1hr", "1hr 30m"];
export { initialFormValues, duration, roadmapDetailsFormValidationMessages };
