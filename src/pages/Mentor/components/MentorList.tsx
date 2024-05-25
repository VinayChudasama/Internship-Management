import { Box, Text } from "@mantine/core";
// import { AccordionUI } from "../../../shared/common-components/AccordionUI";
// import NoRecordsFound from "../../../shared/common-components/NoRecordsFound";
import { IMentor } from "../utility/models/mentor.model";
import { groupedData } from "../../BatchDetails/utility/groupedData";
import { AccordionUI } from "./AccordionUI";

interface IProps {
  mentors: IMentor[];
  toggleDrawer: () => void;
}

const MentorList = ({ mentors, toggleDrawer }: IProps) => {
  // Group mentors by domain

  const groupedMentors = groupedData(mentors);

  return (
    <Box className="mentors-accordion">
      {mentors.length == 0 ? (
        // <NoRecordsFound></NoRecordsFound>
        <Text>No record found</Text>
      ) : (
        <AccordionUI
          tabValue="mentors"
          data={groupedMentors}
          toggleDrawer={toggleDrawer}
        />
      )}
    </Box>
  );
};

export default MentorList;
