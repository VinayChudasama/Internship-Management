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
import { useNavigate, useParams } from "react-router-dom";

const useRoadmapForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id ? "Update Folder" : "Add Folder";
  const btnText = id ? "Update" : "Add";
  const { data: domainData, isLoading } = useGetDomainQuery();
  const [domains, setDomains] = useState<string[]>([]);
  const [addRoadMap] = useAddRoadMapMutation();
  const [updateRoadmap] = useUpdateRoadmapMutation();
  const { data: roadmapDetails } = useGetRoadmapByIdQuery(id);

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
    console.log(values);
    if (id) {
      // If ID is present, update the existing roadmap
      updateRoadmap({ ...values });
    } else {
      // If no ID is present, add a new roadmap
      addRoadMap(values);
    }
    navigate("/roadmap");
  };

  // Form Cancel
  function handleCancel() {
    navigate("/roadmap");
  }

  useEffect(() => {
    form.setValues(roadmapDetails);
  }, [roadmapDetails]);

  useEffect(() => {
    if (domainData && !isLoading) {
      const data: string[] = domainData.map((domain) => {
        return domain.value;
      });
      setDomains(data);
    }
  }, [domainData, isLoading]);

  // Breadcrumbs Data
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: `${btnText} Folder`, href: "" },
  ];
  return {
    title,
    domains,
    form,
    handleFormSubmit,
    handleCancel,
    Breadcrumbitems,
    isFormValidate,
    btnText,
  };
};

export default useRoadmapForm;
