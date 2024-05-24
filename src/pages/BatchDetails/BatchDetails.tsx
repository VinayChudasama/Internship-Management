import { Container, Flex, Paper, Tabs, Title } from "@mantine/core";
import React, { useState } from "react";
import { Breadcrumb } from "../../shared/component/Breadcrumb";
import FilterPopover from "../../shared/component/FilterPopover";
import Searchbox from "../../shared/component/Searchbox";
import { useNavigate, useParams } from "react-router-dom";
import BatchIntern from "./BatchInterns/BatchIntern";

import BatchMentor from "./BatchMentors/BatchMentor";

import Details from "./Details/Details";
import BatchRoadmap from "./BatchRoadmap/BatchRoadmap";

const BatchDetails = () => {
  const navigate = useNavigate();
  const { batchId, tabValue } = useParams();
  const [activeTab, setActiveTab] = useState<string | null>("details");

  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Intern-Batch", href: "/intern-batch" },
    { title: `Jan 2024`, href: "#" },
  ];
  const handleTabChange = (newTab: string | null) => {
    setActiveTab(newTab);
    navigate(`/batch-details/${batchId}/${newTab}`);
  };
  // Default to "First" tab if tabValue is not provided in the URL params
  const defaultTabValue = tabValue || "details";

  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>
                Jan 2024
              </Title>
            </div>
            <Flex gap="sm">
              <Searchbox placeholder={activeTab} />
              <FilterPopover />
            </Flex>
          </Flex>
        </Container>
        {/* Tab Container */}
      </Paper>
      <Paper className="container-bg">
        <Container className="container-fluid">
          <Flex
            direction={"column"}
            py={16}
            h={"100%"}
            className="tab-container"
          >
            <Tabs
              bg={"#fff"}
              value={defaultTabValue}
              styles={{
                root: {
                  borderRadius: "8px",
                  border: "1px solid rgb(222, 226, 230)",
                },
              }}
              onChange={handleTabChange}
            >
              <Tabs.List>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="details">
                  Details
                </Tabs.Tab>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="interns">
                  Interns
                </Tabs.Tab>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="mentors">
                  Mentors
                </Tabs.Tab>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="roadmaps">
                  Roadmaps
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel p={16} value="details">
                <Details />
              </Tabs.Panel>
              <Tabs.Panel p={16} value="interns">
                <BatchIntern />
              </Tabs.Panel>
              <Tabs.Panel p={16} value="mentors">
                <BatchMentor />
              </Tabs.Panel>
              <Tabs.Panel p={16} value="roadmaps">
                <BatchRoadmap />
              </Tabs.Panel>
            </Tabs>
          </Flex>
        </Container>
      </Paper>
    </Flex>
  );
};

export default BatchDetails;
