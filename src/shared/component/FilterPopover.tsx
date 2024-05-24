import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Popover,
  PopoverTarget,
  Stack,
  Title,
} from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { useGetDomainQuery } from "../utility/services/Shared.service";

const FilterPopover = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const { data: domains } = useGetDomainQuery();

  const handleApply = () => {
    setOpened((o) => !o);
  };

  const handleCancel = () => {
    setOpened((o) => !o);
  };

  return (
    <Popover position="bottom-end" opened={opened} onChange={setOpened}>
      <PopoverTarget>
        {/* Start: Indicator to indicating filtering is applied*/}
        {/* <Indicator disabled={selectedDomains.length === 0}> */}
        <Button
          className="filter-box"
          variant="outline"
          onClick={() => setOpened((o) => !o)}
        >
          <IconFilter size={20} />
        </Button>
        {/* </Indicator> */}
        {/* End: Indicator */}
      </PopoverTarget>
      <Popover.Dropdown w={300} className="popover-dropdown">
        <Box p={16} className="popover-header">
          <Title order={5}>Domains</Title>
        </Box>
        <Divider />
        {/* Content of the popover */}

        <Checkbox.Group>
          <Stack
            className="checkbox-stack"
            style={{ overflowY: "scroll" }}
            gap={0}
            h={260}
            mb="0"
          >
            {/* Checkboxes to display filtering options */}
            {domains &&
              domains.map((domain) => (
                <Checkbox
                  className="filter-checkbox cursorPointer"
                  key={domain.id}
                  fw={500}
                  p={16}
                  label={domain.value}
                  mb={8}
                  value={domain.value}
                />
              ))}
          </Stack>
        </Checkbox.Group>
        <Divider />
        {/* on click of cancel button close popover */}
        <Flex
          align={"center"}
          justify={"flex-end"}
          p={16}
          className="popover-footer"
        >
          <Button onClick={handleCancel} mr={8} color="gray" variant="outline">
            Cancel
          </Button>
          {/* on click of apply button, perform filtering */}
          <Button onClick={handleApply}>Apply</Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default FilterPopover;
