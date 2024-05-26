export interface IBatchMentor {
  batchId: string;
  domain: string;
  mentor: string;
  domainOwner: boolean | string;
  email: string;
  id: string;
  phone?: string;
  designation?: string;
  mentorId: string;
}
