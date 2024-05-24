const GenerateId = () => {
  // Use a combination of a random number
  const randomStr = Math.random().toString(36).substring(2, 8);
  return randomStr;
};

export default GenerateId;
