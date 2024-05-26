import { useEffect, useState } from "react";
import { Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useParams, useNavigate } from "react-router";
import { useGetBatchMentorQuery } from "./utility/services/batchMentor.service";
import DrawerElement from "../../../shared/component/DrawerElement";
import { filteredData } from "../utility/filteredData";
import BatchMentorList from "./components/BatchMentorList";
import BatchMentorForm from "./components/BatchMentorForm";
import { IBatchMentor } from "./utility/models/batchMentor.model";

const BatchMentor = () => {
  // get param value from URL
  const { id, batchId } = useParams();
  // Manage drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [batchMentorData, setBatchMentorData] = useState<IBatchMentor[]>([]);
  const { data: batchMentor } = useGetBatchMentorQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (batchMentor && batchId) {
      const filteredRecords = filteredData(batchMentor, batchId);
      setBatchMentorData(filteredRecords);
    }
  }, [batchMentor, batchId]);

  // toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  //   set title of form
  const title = id ? "Update Mentor Detail" : "Add Mentor Detail";

  return (
    <Flex direction="column">
      <Flex>
        {/* Button to open drawer to add mentor into batch */}
        <Button
          onClick={toggleDrawer}
          className="btn-sm"
          variant="light"
          ml="auto"
          mb={14}
          leftSection={<IconPlus size={14} />}
        >
          Add
        </Button>
      </Flex>
      <div>
        {/* Component to list Mentorlist of selected batch */}
        <BatchMentorList
          batchMentorData={batchMentorData}
          toggleDrawer={toggleDrawer}
        />
      </div>
      {/* Drawer component */}
      <DrawerElement
        title={title}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        navigate={navigate}
      >
        <BatchMentorForm
          closeDrawer={() => setDrawerOpen(false)}
          batchMentorData={batchMentorData}
        />
      </DrawerElement>
    </Flex>
  );
};

export default BatchMentor;
