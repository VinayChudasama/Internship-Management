/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode } from "react";
import useRoadmapDetails from "../hooks/useRoadmapDetails";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Select,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { IconChevronDown, IconPlus, IconX } from "@tabler/icons-react";
import { duration } from "../utility/constants/roadmapDetails.constant";
import { Breadcrumb } from "../../../shared/component/Breadcrumb";

const RoadmapDetailsForm = () => {
  const {
    form,
    handleFormSubmit,
    title,
    btnText,
    handleCancel,
    Breadcrumbitems,
    addComponent,
  } = useRoadmapDetails();

  // Form Field UI for Dynamic Form
  const formFields: ReactNode[] = form.values.topics.map((_, index) => {
    return (
      <Box mt={16} key={index}>
        <Flex align="center">
          <Text size="sm" fw={500}>
            Topic {index + 1}
          </Text>
          <Button
            onClick={() => form.removeListItem("topics", index)}
            ml="auto"
            w={28}
            h={28}
            className="btn-sm"
            variant="white"
            leftSection={<IconX color="red" size={16} />}
          ></Button>
        </Flex>
        <Box
          style={{ border: "1px solid #d0d0d2", borderRadius: "6px" }}
          p={12}
          mt={6}
        >
          <Flex w="100%">
            <TextInput
              w="100%"
              withAsterisk
              label="Topic Name"
              placeholder="Enter Topic"
              {...form.getInputProps(`topics.${index}.topicName`)}
            />
            <Select
              w="100%"
              ml="md"
              label="Duration"
              checkIconPosition="right"
              placeholder="Select Duration"
              //   value={selectedValue}
              data={duration}
              rightSection={
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              }
              {...form.getInputProps(`topics.${index}.duration`)}
            />
          </Flex>
          <Textarea
            mt="sm"
            label="SubTopic"
            withAsterisk
            placeholder="Enter Description about topic"
            {...form.getInputProps(`topics.${index}.subtopic`)}
          />
        </Box>
        {/* <Divider my="xs" /> */}
      </Box>
    );
  });

  console.log(form.errors);
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>
                {title}
              </Title>
            </div>
          </Flex>
        </Container>
      </Paper>
      <Paper className="container-bg">
        <Container className="container-fluid">
          <Box className="form-wrapper" h={"100%"} display={"flex"} p={16}>
            <Grid w="100%" columns={24}>
              <Grid.Col style={{ height: "100%" }}>
                <form
                  className="add-form"
                  style={{ backgroundColor: "white", paddingTop: "0" }}
                  onSubmit={form.onSubmit(handleFormSubmit)}
                >
                  {/* Render all existing components */}
                  {formFields}

                  <Button
                    my="sm"
                    className="btn-sm"
                    variant="white"
                    leftSection={<IconPlus size={14} />}
                    onClick={() => addComponent()}
                  >
                    Add Topic
                  </Button>
                  <Divider />
                  <Group justify="flex-end" mt="lg">
                    <Button
                      variant="default"
                      onClick={handleCancel}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit">{btnText}</Button>
                  </Group>
                </form>
              </Grid.Col>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </Flex>
  );
};

export default RoadmapDetailsForm;
