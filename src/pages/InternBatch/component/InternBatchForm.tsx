/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, yupResolver } from "@mantine/form";

import { ValidationSchema } from "../utility/validations/internBatchValidation";
import { useNavigate, useParams } from "react-router-dom";
import {
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
import { DateInput } from "@mantine/dates";
import { IconCalendar, IconChevronDown } from "@tabler/icons-react";
import {
  useAddBatchListMutation,
  useGetBatchListByIdQuery,
  useUpdateBatchListMutation,
} from "../utility/services/internBatch.service";
import { IInternBatch } from "../utility/models/internbatch.model";
import { useEffect } from "react";
import {
  initialFormValues,
  statusData,
} from "../utility/constants/internshipbatch.constant";

const InternBatchForm = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [updateInternsBatch] = useUpdateBatchListMutation();
  const [addInternsBatch] = useAddBatchListMutation();
  const { data: formData } = useGetBatchListByIdQuery(batchId!, {
    skip: !batchId,
  });

  const form = useForm({
    initialValues: {
      ...initialFormValues,
    },
    validate: yupResolver(ValidationSchema),
  });

  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "InternBatch", href: "/intern-batch" },
    {
      title: batchId ? "Update Intern-Batch Detail" : "Add Intern-Batch Detail",
      href: "",
    },
  ];

  //   Handle Submit
  const handleFormSubmit = (values: IInternBatch) => {
    if (batchId) {
      updateInternsBatch({ ...values });
    } else {
      addInternsBatch(values);
    }
    navigate(`/intern-batch`);
  };
  // Handle Cancel
  const handleCancel = () => {
    navigate(`/intern-batch`);
  };

  useEffect(() => {
    if (formData) {
      form.setValues({
        batchname: formData.batchname,
        startdate: new Date(formData.startdate),
        enddate: new Date(formData.enddate),
        status: formData.status,
      });
    }
  }, [formData]);

  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>
                {" "}
                {batchId
                  ? "Update Intern-Batch Detail"
                  : "Add Intern-Batch Detail"}
              </Title>
            </div>
          </Flex>
        </Container>
      </Paper>
      <Paper className="container-bg">
        <Container className="container-fluid">
          <Grid
            className="form-wrapper"
            h={"100%"}
            display={"flex"}
            p={16}
            columns={24}
          >
            <Grid.Col style={{ height: "100%" }} span={12}>
              <form
                className="add-form"
                onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
              >
                <TextInput
                  withAsterisk
                  label="Batch Name"
                  placeholder="Enter Batch Name"
                  {...form.getInputProps("batchname")}
                />

                <DateInput
                  withAsterisk
                  mt="md"
                  rightSection={
                    <IconCalendar
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  }
                  valueFormat="YYYY MMM DD"
                  label="Start Date"
                  placeholder="Select Start Date"
                  {...form.getInputProps("startdate")}
                />
                <DateInput
                  withAsterisk
                  mt="md"
                  rightSection={
                    <IconCalendar
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  }
                  valueFormat="YYYY MMM DD"
                  label="End Date"
                  placeholder="Select End Date"
                  {...form.getInputProps("enddate")}
                />
                <Select
                  mt="md"
                  label="Select Status"
                  placeholder="Pick value"
                  checkIconPosition="right"
                  data={statusData}
                  maxDropdownHeight={200}
                  defaultValue="Not Started"
                  rightSection={
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  }
                  {...form.getInputProps("status")}
                />

                <Group justify="flex-end" mt="lg">
                  <Button variant="default" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">{batchId ? "Update" : "Add"}</Button>
                </Group>
              </form>
            </Grid.Col>
          </Grid>
        </Container>
      </Paper>
    </Flex>
  );
};

export default InternBatchForm;
