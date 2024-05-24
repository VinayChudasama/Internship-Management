import { Button, Container, Flex, Paper, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { Breadcrumb } from "../../shared/component/Breadcrumb";
import Searchbox from "../../shared/component/Searchbox";
import FilterPopover from "../../shared/component/FilterPopover";
import RoadmapList from "./component/RoadmapList";

const Roadmap = () => {
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "#" },
  ];

  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>
                Roadmap
              </Title>
            </div>
            <Flex gap="sm">
              <Searchbox placeholder="Roadmaps" />
              <FilterPopover />
              <Link to="add/new">
                <Button leftSection={<IconPlus size={14} />}>
                  Add New Folder
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Paper>
      <Paper pt={16} className="container-bg">
        <Container className="container-fluid">
          <RoadmapList />
        </Container>
      </Paper>
    </Flex>
  );
};

export default Roadmap;
