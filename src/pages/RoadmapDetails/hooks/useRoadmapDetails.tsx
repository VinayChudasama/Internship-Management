/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, yupResolver } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { initialFormValues } from "../utility/constants/roadmapDetails.constant";
import { useEffect, useState } from "react";
import { IRoadmapDetails } from "../utility/models/roadmapdetails.model";
import {
  useAddRoadMapDetailsMutation,
  useGetRoadMapDetailsQuery,
  useGetRoadmapDetailsByIdQuery,
  useUpdateRoadmapDetailsMutation,
} from "../utility/services/roadmapdetails.service";
import { ValidationSchema } from "../utility/validations/roadmapDetails.validations";

const useRoadmapDetails = () => {
  const navigate = useNavigate();
  const { roadmapId, id } = useParams();
  const btnText: string = id ? "Update" : "Add";
  const [day, setDay] = useState<number>(1);
  const title: string = id
    ? "Update Roadmap Detail"
    : `Add Roadmap Detail-Day ${day}`;
  //   const [selectedValue, setSelectedValue] = useState<string>("");
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
    console.log("call");
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
      console.log("formData", formData);
      const topicsCopy = formData.topics.map((topic) => {
        return {
          ...topic,
        };
      });
      form.setValues({ ...formData, topics: topicsCopy });
    }
  }, [formData]);

  return {
    form,
    isFormValidate,
    handleFormSubmit,
    title,
    btnText,
    handleCancel,
    Breadcrumbitems,
    addComponent,
    formData,
  };
};

export default useRoadmapDetails;
