import { useEffect, useState } from "react";
// import { AccordionUI } from "../../../../../shared/common-components/AccordionUI";

import { Grid } from "@mantine/core";
import NoRecordsFound from "../../../../shared/component/NoRecordsFound";
import { IMentorData } from "../../../Mentor/utility/models/mentor.model";
import { useGetMentorByIdQuery } from "../../../Mentor/utility/services/mentor.service";
import { IBatchMentor } from "../utility/models/batchMentor.model";
import CardUI from "./CardUI";

interface IProps {
  batchMentorData: IMentorData[];
}
const BatchMentorList = ({ batchMentorData }: IProps) => {
  // set mentors details for selected batch
  const [records, setRecords] = useState<any>([]);
  // get mentor data for selected batch
  //   const [groupedMentors, setGroupedMentors] = useState([]);

  useEffect(() => {
    if (batchMentorData) {
      setRecords(batchMentorData);
    }
  }, [batchMentorData]);

  return (
    <>
      {records && records.length == 0 ? (
        <NoRecordsFound></NoRecordsFound>
      ) : (
        <Grid pb="md">
          {records && records.length > 0 ? (
            records.map((tabData: IBatchMentor) => (
              <Grid.Col span={3} key={tabData.id}>
                <CardUI mentorId={tabData.mentorId} />
              </Grid.Col>
            ))
          ) : (
            <Grid.Col>
              <NoRecordsFound />
            </Grid.Col>
          )}
        </Grid>
        // <AccordionUI
        //   tabValue="batchMentors"
        //   data={groupedMentors}
        //   toggleDrawer={toggleDrawer}
        //   // getData={getMentorData}
        // />
      )}
    </>
  );
};

export default BatchMentorList;
