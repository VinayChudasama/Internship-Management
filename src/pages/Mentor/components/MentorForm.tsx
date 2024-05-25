import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddMentorMutation,
  useGetMentorByIdQuery,
  useUpdateMentorMutation,
} from "../utility/services/mentor.service";
import {
  useGetDesignationQuery,
  useGetDomainQuery,
} from "../../../shared/utility/services/Shared.service";
import { IMentorData } from "../utility/models/mentor.model";
import { initialMentorDetailsValues } from "../utility/constants/Mentor.constant";
import { useForm, yupResolver } from "@mantine/form";
import { userProfileValidationSchema } from "../utility/validations/addMentorDetails.validation";
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
} from "@mantine/core";
import { Breadcrumb } from "../../../shared/component/Breadcrumb";

const MentorForm = () => {
  const navigate = useNavigate();
  // get id of selected mentor
  const { id } = useParams();
  // set title for update/add mentor details
  const title = id ? "Update Mentor" : "Add Mentor";
  // set button title according to update/add mentor details
  const btnText = id ? "Update" : "Add";
  const [domains, setDomains] = useState<string[]>([]);
  const [designations, setDesignations] = useState<string[]>([]);
  // get all domains
  const { data: domainData, isLoading: isDomainLoading } = useGetDomainQuery();
  // get all designations
  const { data: designationData, isLoading: isDesignationLoading } =
    useGetDesignationQuery();
  const [addMentor] = useAddMentorMutation();
  const [updateMentor] = useUpdateMentorMutation();
  const { data: mentorDetails } = useGetMentorByIdQuery(id!);

  // Breadcrumbs Data
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Mentor", href: "/mentor" },
    { title: `${btnText} Mentor`, href: "" },
  ];
  const initialValues: IMentorData = initialMentorDetailsValues;
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: initialValues,
    validate: yupResolver(userProfileValidationSchema),
  });
  const isFormValidate = form.isValid();
  /**
   * Add/update mentors details
   * @param {object} values - form values
   */
  const handleFormSubmit = (values: IMentorData) => {
    if (id) {
      // If ID is present, update the existing mentor
      updateMentor({ ...values });
    } else {
      // If no ID is present, add a new mentor
      addMentor(values);
    }
    // Navigate back to the mentor details page after submitting the form
    navigate("/mentor");
  };
  function handleCancel() {
    navigate("/mentor");
  }
  useEffect(() => {
    if (mentorDetails) {
      form.setValues(mentorDetails);
    }
  }, [mentorDetails]);

  useEffect(() => {
    if (domainData && !isDomainLoading) {
      const data: string[] = domainData.map((domain) => {
        return domain.value;
      });
      setDomains(data);
    }
  }, [domainData, isDomainLoading]);
  useEffect(() => {
    if (designationData && !isDesignationLoading) {
      const data: string[] = designationData.map((designation) => {
        return designation.value;
      });
      setDesignations(data);
    }
  }, [designationData, isDesignationLoading]);
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            {/* Set title of add/update mentor details page */}
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
              <Grid.Col style={{ height: "100%" }} span={12}>
                {/* Start: Form to enter mentor details */}
                <form
                  className="add-form"
                  style={{ backgroundColor: "white" }}
                  onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
                >
                  {/* Input field to add first name */}
                  <TextInput
                    withAsterisk
                    label="First Name"
                    placeholder="Enter First Name"
                    {...form.getInputProps("firstName")}
                  />
                  {/* Input field to add last name */}
                  <TextInput
                    mt="md"
                    withAsterisk
                    label="Last Name"
                    placeholder="Enter Last Name"
                    {...form.getInputProps("lastName")}
                  />
                  {/* Input field to add email Id*/}
                  <TextInput
                    mt="md"
                    withAsterisk
                    label="Email ID"
                    placeholder="Enter Email ID"
                    {...form.getInputProps("email")}
                  />
                  {/* Input field to add contact*/}
                  <TextInput
                    mt="md"
                    withAsterisk
                    label="Phone number"
                    placeholder="Enter Contact Number"
                    {...form.getInputProps("phone")}
                  />
                  {/* Dropdown menu to select domain */}
                  <Select
                    mt="md"
                    withAsterisk
                    label="Domain"
                    placeholder="Select Domain"
                    data={domains}
                    {...form.getInputProps("domain")}
                    // onChange={(value) => form.setFieldValue("domain", value)}
                  />
                  {/* Dropdown menu to select domain */}
                  <Select
                    mt="md"
                    withAsterisk
                    label="Designation"
                    placeholder="Select Designation"
                    data={designations}
                    {...form.getInputProps("designation")}
                    // onChange={(value) =>
                    //   form.setFieldValue("designation", value)
                    // }
                  />
                  {/* Submit button to add/update details */}
                  <Group justify="flex-end" mt="md">
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
                {/* End: Form to enter mentor details */}
              </Grid.Col>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </Flex>
  );
};

export default MentorForm;
