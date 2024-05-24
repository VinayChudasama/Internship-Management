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
import useRoadmapForm from "../hooks/useRoadmapForm";

const RoadmapForm = () => {
  const {
    title,
    domains,
    form,
    handleFormSubmit,
    handleCancel,
    Breadcrumbitems,
    isFormValidate,
    btnText,
  } = useRoadmapForm();
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
