/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
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
import {
  duration,
  initialFormValues,
} from "../utility/constants/roadmapDetails.constant";
import { Breadcrumb } from "../../../shared/component/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddRoadMapDetailsMutation,
  useGetRoadMapDetailsQuery,
  useGetRoadmapDetailsByIdQuery,
  useUpdateRoadmapDetailsMutation,
} from "../utility/services/roadmapdetails.service";
import { useForm, yupResolver } from "@mantine/form";
import { ValidationSchema } from "../utility/validations/roadmapDetails.validations";
import { IRoadmapDetails } from "../utility/models/roadmapdetails.model";

const RoadmapDetailsForm = () => {
  const navigate = useNavigate();
  const { roadmapId, id } = useParams();
  const btnText: string = id ? "Update" : "Add";
  const [day, setDay] = useState<number>(1);
  const title: string = id
    ? "Update Roadmap Detail"
    : `Add Roadmap Detail-Day ${day}`;

  const { data: roadmapDetailData } = useGetRoadMapDetailsQuery();
  const [updateRoadmapDetails] = useUpdateRoadmapDetailsMutation();
  const [addRoadMapDetails] = useAddRoadMapDetailsMutation();
  const { data: formData } = useGetRoadmapDetailsByIdQuery(id!, { skip: !id });

  //   Form values
  const form = useForm({
    initialValues: {
      ...initialFormValues(roadmapId!, day),
    },
    validate: yupResolver(ValidationSchema),
  });
  const isFormValidate = form.isValid();

  // Form Submit button
  const handleFormSubmit = async (values: IRoadmapDetails) => {
    try {
      if (id) {
        await updateRoadmapDetails({ ...values });
      } else {
        values.day = `Day ${day}`;
        await addRoadMapDetails(values);
      }

      navigate("/roadmap-details/" + roadmapId);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Breadcrumbs Data
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: "Roadmap Details", href: "/roadmap" },
    { title: `${btnText} Roadmap Details`, href: "" },
  ];

  // Handle Cancel
  function handleCancel() {
    navigate("/roadmap-details/" + roadmapId);
  }

  // Add Dynamic Component to form on click of Add Topic Button
  function addComponent() {
    form.insertListItem("topics", {
      id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, ""),
      topicName: "",
      subtopic: "",
      duration: "",
    });
  }
  // To set Day value
  useEffect(() => {
    if (roadmapDetailData) {
      const length: number = roadmapDetailData.filter(
        (data) => data.roadmapId == roadmapId
      ).length;
      setDay(length + 1);
    }
  }, [roadmapDetailData]);

  // Populate the form with fetched details
  useEffect(() => {
    if (formData && id) {
      const topicsCopy = formData.topics.map((topic) => {
        return {
          ...topic,
        };
      });
      form.setValues({ ...formData, topics: topicsCopy });
    }
  }, [formData]);

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
      </Box>
    );
  });

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
                    <Button disabled={!isFormValidate} type="submit">
                      {btnText}
                    </Button>
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
