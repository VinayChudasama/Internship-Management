import { Box, Button, Checkbox, Group, Select, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { useNavigate, useParams } from "react-router";
import { IconChevronDown } from "@tabler/icons-react";
import {
  useAddBatchMentorMutation,
  useGetBatchMentorByIdQuery,
  useUpdateBatchMentorMutation,
} from "../utility/services/batchMentor.service";
import { IBatchMentor } from "../utility/models/batchMentor.model";
import { useGetDomainQuery } from "../../../../shared/utility/services/Shared.service";
import { useGetMentorDataQuery } from "../../../Mentor/utility/services/mentor.service";
import {
  IMentor,
  IMentorData,
} from "../../../Mentor/utility/models/mentor.model";
import { initialBatchMentorDetailsValues } from "../utility/constants/BatchMentor.constant";
import { ValidationSchema } from "../utility/validations/batchMentor.validation";

interface IProps {
  closeDrawer: () => void;
  batchMentorData: IBatchMentor[];
}
const BatchMentorForm = ({ closeDrawer, batchMentorData }: IProps) => {
  const navigate = useNavigate();
  // get param values using URL
  const { id, batchId } = useParams<string>();
  // get all domain data
  // const domainData = useDomain();
  const { data: domainData, isLoading } = useGetDomainQuery();
  const [domains, setDomains] = useState<string[]>([]);
  // get all mentors data
  const { data: mentorsData } = useGetMentorDataQuery();
  // get selected batch mentor data
  const batchMentor = batchMentorData;
  const [allMentors, setAllMentor] = useState<IMentorData[]>([]);
  // to store mentors data for selected batch
  const [mentors, setMentors] = useState<IMentor[]>([]);
  // set button text of form
  const btnText = id ? "Update" : "Add";

  const [updateBatchMentor] = useUpdateBatchMentorMutation();
  const [addBatchMentor] = useAddBatchMentorMutation();
  const { data: formData } = useGetBatchMentorByIdQuery(id!, { skip: !id });

  // create form with initial values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      batchId: batchId,
      ...initialBatchMentorDetailsValues,
      mentorId: "",
    },
    transformValues: (values) => ({
      id: values.id,
      batchId: batchId,
      domain: values.domain,
      mentorId: values.mentorId,
      domainOwner: values.domainOwner,
    }),
    validate: yupResolver(ValidationSchema),
  });
  const isFormValidate = form.isValid();
  const selectedValues = form.getTransformedValues();

  // Close drawer on click of cancel icon
  function handleCancel() {
    closeDrawer();
    navigate("/batch-details/" + batchId + "/mentors");
  }
  useEffect(() => {
    if (mentorsData) {
      setAllMentor(mentorsData);
    }
  }, [mentorsData]);

  useEffect(() => {
    if (allMentors) {
      // filter mentors according to selected domain value
      const mentors = allMentors
        .filter((record) => record.domain == selectedValues.domain)
        .map((mentor) => ({
          value: mentor.id,
          label: mentor.firstName + " " + mentor.lastName,
        }));
      setMentors(mentors);
    }
  }, [domains, allMentors, selectedValues.domain]);

  // submit values on click of add/update button
  const handleFormSubmit = (values: IBatchMentor) => {
    if (id) {
      // If ID is present, update the existing mentor
      if (values && values.domainOwner) {
        // update domain owner value to false
        const updatedMentors = batchMentor
          .filter((mentor) => mentor.domain === values.domain)
          .map((mentor) => {
            updateBatchMentor({
              id: mentor.id,
              batchMentorData: { ...mentor, domainOwner: false },
            });
          });

        Promise.all(updatedMentors).then(() => {
          updateBatchMentor({ id: values.id, batchMentorData: values });
        });
      } else {
        values && updateBatchMentor({ id: values.id, batchMentorData: values });
      }
    } else {
      // If no ID is present, add a new mentor
      if (form.values.domainOwner == true) {
        const updatedMentors = batchMentor
          .filter((mentor) => mentor.domain === form.values.domain)
          .map((mentor) => {
            updateBatchMentor({
              id: mentor.id,
              batchMentorData: { ...mentor, domainOwner: false },
            });
          });
        Promise.all(updatedMentors).then(() => {
          values && addBatchMentor(values);
        });
      } else {
        values && addBatchMentor(values);
      }
    }
    closeDrawer();
    navigate("/batch-details/" + batchId + "/mentors");
  };

  // Handle domain owner field value
  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("domainOwner", event.target.checked);
  };
  useEffect(() => {
    const fetchMentorData = async () => {
      if (id && formData) {
        try {
          // Populate the form with fetched details
          form.setValues(formData);
        } catch (error) {
          console.error("Error fetching mentor details:", error);
        }
      }
    };
    fetchMentorData();
  }, [id, formData]);

  useEffect(() => {
    if (domainData && !isLoading) {
      const data: string[] = domainData.map((domain) => {
        return domain.value;
      });
      setDomains(data);
    }
  }, [domainData, isLoading]);
  return (
    <Box>
      {/* Start: Form to add mentor in batch*/}
      <form
        style={{ backgroundColor: "white" }}
        onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
      >
        {/* Dropdown menu to select domain value*/}
        <Select
          mt="md"
          label="Select Domain"
          placeholder="Select Domain"
          checkIconPosition="right"
          data={domains}
          rightSection={
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          }
          {...form.getInputProps("domain")}
        />

        {/* If domain is selected show mentor list for selected domain in dropdown menu */}
        {selectedValues.domain && (
          <>
            <Select
              mt="md"
              label="Select Mentor"
              placeholder="Select Mentor"
              checkIconPosition="right"
              data={mentors}
              maxDropdownHeight={200}
              rightSection={
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              }
              {...form.getInputProps("mentorId")}
            ></Select>

            {/* Checkbox to set domain owner */}
            <Checkbox
              label="Set as Domain Owner"
              mt="md"
              {...form.getInputProps("domainOwner", {
                type: "checkbox",
              })}
              onChange={handleCheckBox}
            >
              Set as Domain Owner
            </Checkbox>
            <Group
              style={{ borderTop: "1px solid rgb(222, 226, 230)" }}
              p={24}
              justify="flex-end"
              mt="xl"
            >
              {/* Cancel button to close drawer*/}
              <Button variant="default" onClick={handleCancel}>
                Cancel
              </Button>
              {/* Submit button to submit values */}
              <Button disabled={!isFormValidate} type="submit">
                {btnText}
              </Button>
            </Group>
          </>
        )}
      </form>
      {/* Start: Form to add mentor in batch*/}
    </Box>
  );
};

export default BatchMentorForm;
