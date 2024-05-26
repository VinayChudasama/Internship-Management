import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Title,
  Tooltip,
  Text,
} from "@mantine/core";
import DropdownMenu from "../../../../shared/component/DropdownMenu";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { useGetMentorByIdQuery } from "../../../Mentor/utility/services/mentor.service";
interface CardUIProps {
  mentorId: string;
}
const CardUI = ({ mentorId }: CardUIProps) => {
  const { data: mentorData } = useGetMentorByIdQuery(mentorId);
  return (
    <Card withBorder key={mentorData?.id} radius={8}>
      <Card.Section withBorder>
        <Flex justify="space-between" align="center" p={16}>
          <Group justify="flex-start" gap={12}>
            <Avatar size={40} variant="light" color="#005ba9" radius="sm">
              {`${mentorData?.firstName?.charAt(0) || ""}${
                mentorData?.lastName?.charAt(0) || ""
              }`}
            </Avatar>
            <Box>
              <Title order={6}>
                {mentorData?.firstName} {mentorData?.lastName}
                {mentorData?.domainOwner == true && "(Owner)"}
              </Title>
              <Text size="sm">{mentorData?.designation}</Text>
            </Box>
          </Group>
          {/* Dropdown menu to perform edit/delete */}
          <DropdownMenu
            id={mentorData?.id}
            tabValue="batchMentor"
            toggleDrawer={() => {}}
          />
        </Flex>
      </Card.Section>
      <Card.Section>
        <Group justify="space-evenly" align="center" px={12}>
          <Tooltip label={mentorData?.phone}>
            <a title={mentorData?.phone} href={`tel:${mentorData?.phone}`}>
              <Button
                leftSection={<IconPhone size={16} />}
                c="#868e96"
                py={8}
                my={4}
                variant="transparent"
              >
                Phone
              </Button>
            </a>
          </Tooltip>
          <Divider orientation="vertical" />
          <Tooltip label={mentorData?.email}>
            <a title={mentorData?.email} href={`tel:${mentorData?.email}`}>
              <Button
                leftSection={<IconMail size={16} />}
                c="#868e96"
                my={4}
                py={8}
                variant="transparent"
              >
                Email
              </Button>
            </a>
          </Tooltip>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default CardUI;
