import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddBatchRoadmapMutation,
  useGetBatchRoadmapByIdQuery,
  useUpdateBatchRoadmapMutation,
} from "../utility/services/batchroadmap.service";
import { useForm } from "@mantine/form";
import {
  initialFormValues,
  transformedValues,
} from "../utility/constants/batchRoadmap.constant";
import { Box, Button, Group, Select, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useGetDomainQuery } from "../../../../shared/utility/services/Shared.service";
import { IDomains } from "../../../../shared/utility/models/Shared.model";
import { useGetRoadMapDataQuery } from "../../../Roadmap/utility/services/roadmap.service";
import {
  IBatchRoadmap,
  ISubtopics,
} from "../utility/models/batchroadmap.model";
import { useGetRoadMapDetailsQuery } from "../../../RoadmapDetails/utility/services/roadmapdetails.service";
import { IRoadmapData } from "../../../Roadmap/utility/models/roadmap.model";

interface IProp {
  closeDrawer: () => void;
}
const BatchRoadmapForm = ({ closeDrawer }: IProp) => {
  const navigate = useNavigate();
  const { batchId, id } = useParams();
  const btnText = id ? "Update" : "Add";
  const [domains, setDomains] = useState<string[]>([]);
  const [roadmapDropdownData, setRoadmapDropdownData] = useState<string[]>([]);
  //   const [mentorDropdownData, setMentorDropdownData] = useState<>([]);

  const [updateBatchRoadmap] = useUpdateBatchRoadmapMutation();
  const [addBatchRoadMap] = useAddBatchRoadmapMutation();
  const { data: roadmapDetailsData } = useGetRoadMapDetailsQuery();

  const { data: domainData, isLoading } = useGetDomainQuery();
  const { data: roadmapData } = useGetRoadMapDataQuery();
  const { data: formData } = useGetBatchRoadmapByIdQuery(id!, { skip: !id });
  console.log(roadmapData, closeDrawer);

  const form = useForm({
    initialValues: {
      ...initialFormValues,
    },
    transformValues: (values) => ({
      ...transformedValues(batchId!, values),
    }),
  });
  const selectedValues = form.getTransformedValues();
  //  Find the duration based on selected value
  const selectedOption: IRoadmapData | undefined =
    roadmapData &&
    roadmapData.find((option) => option.name === selectedValues.topic);
  async function handleFormSubmit(values: IBatchRoadmap) {
    // Storing Subtopics in temp Array
    const tempArrayForSubtopics: ISubtopics[] = [];
    roadmapDetailsData &&
      roadmapDetailsData
        .filter((batch) => batch.roadmapId === selectedOption.id)
        .map((roadmap) => {
          roadmap.topics.map((data) => {
            tempArrayForSubtopics.push({ ...data, day: roadmap.day });
          });
        });

    // Function to generate a unique ID
    function generateUniqueId() {
      // Use a combination of a random number
      const randomStr = Math.random().toString(36).substring(2, 8);
      return randomStr;
    }
    // Storing Subtopics array in updatedSubtopic
    const updatedSubtopics = tempArrayForSubtopics.map((data) => ({
      id: generateUniqueId(),
      status: "Not Started",
      title: data.title,
      subtopics: data.description,
      duration: data.duration,
      topicid: data.id,
      date: null,
      day: parseInt(data.day.match(/\d+/)[0]), // To Extract "1" from string "Day 1" and convert it to Integer
    }));
    // Set duration field
    const newValues = {
      ...values,
      // duration: selectedOption.totalDuration,
      day: selectedOption.totalDays,
      roadmapId: selectedOption.id,
      subTopics: updatedSubtopics,
    };
    console.log("Added", newValues);
    if (id) {
      // If ID is present, update the existing roadmap
      await updateBatchRoadmap({ id, ...newValues });
    } else {
      // If no ID is present, add a new roadmap
      console.log("In Add");
      await addBatchRoadMap(newValues);
    }
    closeDrawer();

    navigate("/batch-details/" + batchId + "/roadmaps");
  }
  function handleCancel() {
    closeDrawer();
    navigate("/batch-details/" + batchId + "/roadmaps");
  }
  useEffect(() => {
    const fetchRoadmapDetails = async () => {
      if (id && formData) {
        try {
          // Populate the form with fetched details
          form.setValues(formData);
        } catch (error) {
          console.error("Error fetching roadmap details:", error);
        }
      }
    };
    fetchRoadmapDetails();
  }, [id, formData]);

  useEffect(() => {
    if (domainData && !isLoading) {
      const data: string[] = domainData.map((domain: IDomains) => {
        return domain.value;
      });
      setDomains(data);
    }
  }, [domainData, isLoading]);
  useEffect(() => {
    if (selectedValues.domain && roadmapData) {
      // Add Data for Topic Dropdown
      const roadmaps = roadmapData
        .filter((record) => record.domain == selectedValues.domain)
        .map((data) => {
          return data.name;
        });
      setRoadmapDropdownData(roadmaps);
    }
  }, [selectedValues.domain, roadmapData]);
  return (
    <Box>
      <form
        style={{ backgroundColor: "white" }}
        onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
      >
        {/* Domain Dropdown */}
        <Select
          mt="md"
          label="Select Domain"
          placeholder="Select Domain"
          checkIconPosition="right"
          data={domains}
          maxDropdownHeight={180}
          rightSection={
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          }
          {...form.getInputProps("domain")}
        />
        {/* Conditionnal based rendering, If we select Domain then only other dropdowns are visible */}
        {selectedValues.domain && (
          <>
            {/* Roadmap Dropdown */}
            <Select
              mt="md"
              disabled={!selectedValues.domain}
              label="Select Roadmap"
              placeholder="Select Roadmap"
              checkIconPosition="right"
              data={roadmapDropdownData}
              // data={roadmapDropdownData.map((entry) => entry.name)}
              maxDropdownHeight={200}
              rightSection={
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              }
              {...form.getInputProps("topic")}
            />
            {/* Mentor Dropdown */}
            <Select
              mt="md"
              disabled={!selectedValues.domain}
              label="Select Mentor"
              placeholder="Select Mentor"
              checkIconPosition="right"
              //   data={mentorDropdownData}
              maxDropdownHeight={200}
              rightSection={
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              }
              {...form.getInputProps("mentor")}
            />
            {/* Drawer footer with action Buttons */}
            <Group
              style={{ borderTop: "1px solid rgb(222, 226, 230)" }}
              p={24}
              justify="flex-end"
              mt="xl"
            >
              <Button variant="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">{btnText}</Button>
            </Group>
          </>
        )}
      </form>
    </Box>
  );
};

export default BatchRoadmapForm;
