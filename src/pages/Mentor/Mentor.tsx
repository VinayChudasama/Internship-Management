import { Button, Container, Flex, Paper, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import MentorList from "./components/MentorList";
import { IconPlus } from "@tabler/icons-react";
import { Breadcrumb } from "../../shared/component/Breadcrumb";
import Searchbox from "../../shared/component/Searchbox";
import FilterPopover from "../../shared/component/FilterPopover";
const Mentor = () => {
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Mentor", href: "#" },
  ];

  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>
                Mentor
              </Title>
            </div>
            <Flex gap="sm">
              <Searchbox placeholder="Mentors" />
              <FilterPopover />
              <Link to="/mentor/add/new">
                <Button leftSection={<IconPlus size={14} />}>
                  Add New Mentor
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Paper>
      {/* Component to display mentor details */}
      <Paper pt={16} className="container-bg">
        <Container className="container-fluid">
          <MentorList />
        </Container>
      </Paper>
    </Flex>
  );
};

export default Mentor;
