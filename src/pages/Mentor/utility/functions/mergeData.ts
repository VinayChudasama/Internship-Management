import { IMentor } from "../models/mentor.model";

export const mergeData = (data: IMentor[]) => {
  const modifiedData = data.map((item) => ({
    ...item,
    mentor: `${item.firstName} ${item.lastName}`, // ConcatefirstName and lastName
  }));
  return modifiedData;
};
