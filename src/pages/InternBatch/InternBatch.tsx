import { Button, Container, Flex, Group, Paper, Title } from "@mantine/core";
import React from "react";
import { Breadcrumb } from "../../shared/component/Breadcrumb";
import Searchbox from "../../shared/component/Searchbox";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import InternBatchTable from "./component/InternBatchTable";

const InternBatch = () => {
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Intern-Batch", href: "/intern-batch" },
  ];
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>
                InternBatch
              </Title>
            </div>
            <Group>
              <Searchbox placeholder="Internship Batch" />
              <Link to="add/new">
                <Button leftSection={<IconPlus size={14} />}>
                  Add New Batch
                </Button>
              </Link>
            </Group>
          </Flex>
        </Container>
      </Paper>
      <InternBatchTable />
    </Flex>
  );
};

export default InternBatch;
