import GenerateId from "../../../../../shared/utility/helper/GenerateId";
import { IBatchRoadmap } from "../models/batchroadmap.model";

const initialFormValues = (batchId: string) => {
  const formValues: IBatchRoadmap = {
    id: GenerateId(),
    batchId: batchId,
    topic: " ",
    domain: " ",
    mentor: " ",
    day: 0,
    status: "Not Started",
    roadmapId: " ",
    subTopics: [
      {
        id: GenerateId(),
        status: "",
        title: "",
        description: "",
        duration: "",
        topicId: "",
        date: null,
        day: 0,
      },
    ],
  };
  return formValues;
};

const transformedValues = (batchId: string, values: IBatchRoadmap) => {
  const transformedValues: IBatchRoadmap = {
    batchId: batchId,
    topic: values.topic,
    domain: values.domain,
    mentor: values.mentor,
    day: values.day,
    roadmapId: values.roadmapId,
    status: values.status,
    subTopics: values.subTopics,
    id: values.id,
  };
  return transformedValues;
};

export { initialFormValues, transformedValues };
