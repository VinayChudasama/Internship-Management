import RoadmapDetailsTable from "./components/RoadmapDetailsTable";
import { Button, Container, Flex, Paper, Title } from "@mantine/core";
import { Breadcrumb } from "../../shared/component/Breadcrumb";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";

const RoadmapDetails = () => {
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: "Roadmap Details", href: "#" },
  ];
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>
                Roadmap Details
              </Title>
            </div>
            <Link to="add/new-details">
              <Button leftSection={<IconPlus size={14} />}>
                Add Roadmap Details
              </Button>
            </Link>
          </Flex>
        </Container>
      </Paper>
      <Paper className="container-bg">
        <Container className="container-fluid">
          <div className="table-container">
            <RoadmapDetailsTable />
          </div>
        </Container>
      </Paper>
    </Flex>
  );
};

export default RoadmapDetails;
