import { Button, Flex, Modal } from "@mantine/core";

interface IProps {
  open: boolean;
  closeDialog: () => void;
  deleteFunction: () => void;
}
export default function ConfirmationModal({
  open,
  closeDialog,
  deleteFunction,
}: IProps) {
  return (
    <Modal
      opened={open}
      onClose={closeDialog}
      size="sm"
      title="Are you sure you want to Delete ?"
      centered
      radius="md"
    >
      <Flex gap="sm" justify="flex-end" align="center">
        <Button onClick={closeDialog} color="gray">
          Cancel
        </Button>
        <Button onClick={deleteFunction} variant="filled" color="red">
          Delete
        </Button>
      </Flex>
    </Modal>
  );
}
