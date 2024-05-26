// Filter Records based on batchId
export const filteredData = (response: any, batchId: string) => {
  const data = [...response];
  return data && data.filter((record) => record.batchId == batchId);
};
