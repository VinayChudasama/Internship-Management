import { IMentor } from "../../Mentor/utility/models/mentor.model";

export interface GroupedData {
  [domain: string]: any[];
}
// Group values by domain in ascending order
export const groupedData = (records: IMentor[]): GroupedData => {
  console.log("in group", records);

  records.sort((a, b) => {
    if (a.domain < b.domain) {
      return -1;
    } else if (a.domain > b.domain) {
      return 1;
    } else {
      return 0;
    }
  });

  return records.reduce<GroupedData>((acc, data) => {
    if (!acc[data.domain]) {
      acc[data.domain] = [];
    }
    acc[data.domain].push(data);
    return acc;
  }, {});
};
