import React from "react";
import { Card, Flex, Stack, Text } from "@mantine/core";
import { IconFolderCode } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const RoadmapCard = ({ data, type }) => {
  return (
    <Card
      className="roadmap-folder"
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
    >
      <Flex align="center">
        <Flex
          style={{ flexShrink: "0", borderRadius: "6px" }}
          align={"center"}
          justify={"center"}
          w={38}
          h={38}
          bg={"#e7ecf6"}
        >
          <IconFolderCode color="#00488A"></IconFolderCode>
        </Flex>
        <Stack w="100%" gap="xs" ml="md">
          <Link
            to={"/roadmap-details/" + data.id}
            className="text-link"
            style={{ fontSize: "14px" }}
          >
            {type == "roadmap" ? data.name : data.topic}
          </Link>
          <Text
            fz={12}
            c={"#868e96"}
            fw={600}
            mt={-10}
            className="roadmap-domain"
          >
            {data.domain}
          </Text>
        </Stack>
        <DropdownMenu id={data.id} tabValue={type} />
      </Flex>
    </Card>
  );
};

export default RoadmapCard;
