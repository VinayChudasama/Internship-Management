export interface IMentor {
  value: string;
  label: string;
}
//Modal for Mentor details
export interface IMentorData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  domain: string;
  phone: string;
  designation: string;
  mentor?: string | IMentor;
  domainOwner?: string | boolean;
  mentorId?: string;
}
