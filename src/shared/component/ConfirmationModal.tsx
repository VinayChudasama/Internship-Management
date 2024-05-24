import { Button, Flex, Modal } from "@mantine/core";
import React, { FunctionComponent } from "react";

export default function ConfirmationModal({
  open,
  closeDialog,
  deleteFunction,
}) {
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
