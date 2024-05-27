export interface ISubtopics {
  id: string;
  status: string;
  title: string;
  description: string;
  duration: string;
  topicId: string;
  date: string | null;
  day: number;
}

export interface IBatchRoadmap {
  id: string;
  batchId: string;
  topic: string;
  domain: string;
  mentor: string;
  day: number;
  status: string;
  roadmapId: string;
  subTopics: ISubtopics[];
}
