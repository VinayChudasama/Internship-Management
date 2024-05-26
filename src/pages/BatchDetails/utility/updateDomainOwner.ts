import { IBatchMentor } from "../BatchMentors/utility/models/batchMentor.model";
import { useUpdateBatchMentorMutation } from "../BatchMentors/utility/services/batchMentor.service";

// helper function to update domain owner value to false
export function updateDomainOwner(value: string, batchMentor: IBatchMentor[]) {
  const [updateBatchMentor] = useUpdateBatchMentorMutation();
  // Filter batchMentor data to find mentors with matching domain
  const mentorsToUpdate = batchMentor.filter(
    (mentor) => mentor.domain === value
  );
  // update domain owner value to false
  const updatedValues = mentorsToUpdate.map((mentor) => {
    updateBatchMentor({
      id: mentor.id,
      batchMentorData: { ...mentor, domainOwner: false },
    });
  });
  return updatedValues;
}
