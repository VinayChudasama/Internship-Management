import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteRoadMapMutation } from "../../pages/Roadmap/utility/services/roadmap.service";
import { Menu, UnstyledButton, rem } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import ConfirmationModal from "./ConfirmationModal";
import { useDeleteRoadmapDetailsMutation } from "../../pages/RoadmapDetails/utility/services/roadmapdetails.service";
interface IProps {
  id: string;
  tabValue: string;
}
const DropdownMenu = ({ id, tabValue }: IProps) => {
  const navigate = useNavigate();
  const [deleteRoadmap] = useDeleteRoadMapMutation();
  const [deleteRoadmapDetails] = useDeleteRoadmapDetailsMutation();
  console.log(id, tabValue);

  // manage confirm box
  const [open, setOpen] = useState<boolean>(false);

  // On click of edit button open drawer and perform navigation
  const handleEditClick = () => {
    // toggleDrawer();
    navigate("edit/" + id);
  };

  // delete mentor details from list
  function handleDelete() {
    //    id, delete path
    if (tabValue == "roadmap") {
      deleteRoadmap(id);
    } else if (tabValue == "roadmapDetails") {
      deleteRoadmapDetails(id);
    }
    setOpen(false);
  }

  // Open Delete confirmation box
  function openPopup() {
    setOpen(true);
  }

  return (
    <>
      {/* Start: Dropdown menu for edit/delete mentor details */}
      <Menu shadow="md" position="bottom-end" width={200}>
        {/* Start: Target button to open dropdown menu */}
        <Menu.Target>
          <UnstyledButton>
            <IconDotsVertical
              style={{ width: rem(18), height: rem(18) }}
            ></IconDotsVertical>
          </UnstyledButton>
        </Menu.Target>
        {/* End: Target button to open dropdown menu */}

        {/* Start: Listing menu options */}
        <Menu.Dropdown>
          {/* Option for edit */}
          <Menu.Item
            onClick={() => handleEditClick()}
            leftSection={
              <IconPencil style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Edit
          </Menu.Item>

          {/* Option for delete */}
          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => openPopup()}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
        {/* End: Listing menu options */}
      </Menu>
      {/* End: Dropdown menu for edit/delete mentor details */}
      {/* Confirmation POP-Up to delete Item */}
      <ConfirmationModal
        open={open}
        closeDialog={() => setOpen(false)}
        deleteFunction={handleDelete}
      />
    </>
  );
};

export default DropdownMenu;
