/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Paper,
  Select,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { Breadcrumb } from "../../../shared/component/Breadcrumb";
import { IconChevronDown } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetDomainQuery } from "../../../shared/utility/services/Shared.service";
import {
  useAddRoadMapMutation,
  useGetRoadmapByIdQuery,
  useUpdateRoadmapMutation,
} from "../utility/services/roadmap.service";
import { useForm, yupResolver } from "@mantine/form";
import { initialFormValues } from "../utility/constants/Roadmap.constant";
import { ValidationSchema } from "../utility/validations/roadmap.validation";
import { IRoadmapData } from "../utility/models/roadmap.model";

const RoadmapForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id ? "Update Folder" : "Add Folder";
  const btnText = id ? "Update" : "Add";
  const [domains, setDomains] = useState<string[]>([]);

  const { data: domainData, isLoading } = useGetDomainQuery();
  const [addRoadMap] = useAddRoadMapMutation();
  const [updateRoadmap] = useUpdateRoadmapMutation();
  const { data: roadmapDetails } = useGetRoadmapByIdQuery(id!);

  // Breadcrumbs Data
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: `${btnText} Folder`, href: "" },
  ];

  // Form Values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ...initialFormValues,
    },

    validate: yupResolver(ValidationSchema),
  });
  const isFormValidate = form.isValid();

  // Form Submit button
  const handleFormSubmit = (values: IRoadmapData) => {
    if (id) {
      updateRoadmap({ ...values });
    } else {
      addRoadMap(values);
    }
    navigate("/roadmap");
  };

  // Form Cancel
  function handleCancel() {
    navigate("/roadmap");
  }

  useEffect(() => {
    if (roadmapDetails) {
      form.setValues(roadmapDetails);
    }
  }, [roadmapDetails]);

  useEffect(() => {
    if (domainData && !isLoading) {
      const data: string[] = domainData.map((domain) => {
        return domain.value;
      });
      setDomains(data);
    }
  }, [domainData, isLoading]);

  return (
    <>
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
                    style={{ backgroundColor: "white" }}
                    onSubmit={form.onSubmit((values) =>
                      handleFormSubmit(values)
                    )}
                  >
                    <TextInput
                      withAsterisk
                      label="Name"
                      placeholder="Enter Folder Name"
                      {...form.getInputProps("name")}
                    />

                    <Select
                      mt="md"
                      label="Select Domain"
                      placeholder="Select Domain"
                      checkIconPosition="right"
                      data={domains}
                      maxDropdownHeight={200}
                      rightSection={
                        <IconChevronDown
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      }
                      {...form.getInputProps("domain")}
                    />

                    <Group justify="flex-end" mt="lg">
                      <Button
                        variant="default"
                        onClick={handleCancel}
                        type="submit"
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
    </>
  );
};

export default RoadmapForm;
