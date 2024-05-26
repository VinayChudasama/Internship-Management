import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IMentorData } from "../utility/models/mentor.model";
import { useGetMentorDataQuery } from "../utility/services/mentor.service";
import { useEffect, useState } from "react";
import DropdownMenu from "../../../shared/component/DropdownMenu";
import { IconMail, IconPhone } from "@tabler/icons-react";
import NoRecordsFound from "../../../shared/component/NoRecordsFound";
import { mergeData } from "../utility/functions/mergeData";

const MentorList = () => {
  const { data: mentorData, isLoading } = useGetMentorDataQuery();
  const [mentorList, setMentorList] = useState<IMentorData[] | []>([]);

  useEffect(() => {
    if (mentorData && !isLoading) {
      // Merge firstName and lastName into fullName for searching
      const modifiedData = mergeData(mentorData);
      setMentorList(modifiedData);
    }
  }, [mentorData, isLoading]);

  return (
    <Grid pb="md">
      {mentorList && mentorList.length > 0 ? (
        mentorList.map((tabData: IMentorData) => (
          <Grid.Col span={3} key={tabData.id}>
            <Card withBorder key={tabData.id} radius={8}>
              <Card.Section withBorder>
                <Flex justify="space-between" align="center" p={16}>
                  <Group justify="flex-start" gap={12}>
                    <Avatar
                      size={40}
                      variant="light"
                      color="#005ba9"
                      radius="sm"
                    >
                      {tabData.mentor
                        .split(" ")
                        .map((name) => name.charAt(0).toUpperCase())
                        .join("")}
                    </Avatar>
                    <Box>
                      <Title order={6}>
                        {tabData.mentor} {tabData.domainOwner && "(Owner)"}
                      </Title>
                      <Text size="sm">{tabData.designation}</Text>
                    </Box>
                  </Group>
                  {/* Dropdown menu to perform edit/delete */}
                  <DropdownMenu
                    id={tabData.id}
                    tabValue="mentor"
                    toggleDrawer={() => {}}
                  />
                </Flex>
              </Card.Section>
              <Card.Section>
                <Group justify="space-evenly" align="center" px={12}>
                  <Tooltip label={tabData.phone}>
                    <a title={tabData.phone} href={`tel:${tabData.phone}`}>
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
                  <Tooltip label={tabData.email}>
                    <a title={tabData.email} href={`tel:${tabData.email}`}>
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
          </Grid.Col>
        ))
      ) : (
        <Grid.Col>
          <NoRecordsFound />
        </Grid.Col>
      )}
    </Grid>
  );
};

export default MentorList;
