import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IBatchRoadmap } from "./utility/models/batchroadmap.model";
import { useGetBatchRoadmapQuery } from "./utility/services/batchroadmap.service";
import { filteredData } from "../utility/filteredData";
import { Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import DrawerElement from "../../../shared/component/DrawerElement";
import BatchRoadmapList from "./components/BatchRoadmapList";
import BatchRoadmapForm from "./components/BatchRoadmapForm";

const BatchRoadmap = () => {
  // get param value from URL
  const { id, batchId } = useParams();
  // Manage drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [batchRoadmapData, setBatchRoadmapData] = useState<IBatchRoadmap[]>([]);
  const { data: batchRoadmap } = useGetBatchRoadmapQuery();
  const navigate = useNavigate();

  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  //   set title of form
  const title = id ? "Update Roadmap Detail" : "Add Roadmap Detail";
  useEffect(() => {
    if (batchRoadmap && batchId) {
      const filteredRecords = filteredData(batchRoadmap, batchId);
      setBatchRoadmapData(filteredRecords);
    }
  }, [batchRoadmap, batchId]);

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
        <BatchRoadmapList
          batchRoadmapData={batchRoadmapData}
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
        <BatchRoadmapForm closeDrawer={() => setDrawerOpen(false)} />
      </DrawerElement>
    </Flex>
  );
};

export default BatchRoadmap;
