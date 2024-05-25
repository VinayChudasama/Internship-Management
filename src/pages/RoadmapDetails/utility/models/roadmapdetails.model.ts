export interface ITopics {
  id: string;
  topicName: string;
  subtopic: string;
  duration: string;
}

export interface IRoadmapDetails {
  id: string;
  roadmapId: string;
  day: string;
  topics: ITopics[];
}
