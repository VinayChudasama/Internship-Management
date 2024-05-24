import { useEffect, useState } from "react";
import { useGetRoadMapDataQuery } from "../utility/services/roadmap.service";
import { IRoadmapData } from "../utility/models/roadmap.model";
import { Card, Flex, Grid, Stack, Text } from "@mantine/core";
import { IconFolderCode } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import DropdownMenu from "../../../shared/component/DropdownMenu";
import NoRecordsFound from "../../../shared/component/NoRecordsFound";

const RoadmapList = () => {
  const { data: roadmapData, isLoading } = useGetRoadMapDataQuery();
  const [roadmapList, setRoadmapList] = useState<IRoadmapData[] | []>([]);

  useEffect(() => {
    if (roadmapData && !isLoading) {
      setRoadmapList(roadmapData);
    }
  }, [roadmapData, isLoading]);

  return (
    <>
      <Grid pb="md">
        {roadmapList && roadmapList.length > 0 ? (
          roadmapList.map((tabData: IRoadmapData) => (
            <Grid.Col span={3} key={tabData.id}>
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
                      to={"/roadmap-details/" + tabData.id}
                      className="text-link"
                      style={{ fontSize: "14px" }}
                    >
                      {tabData.name}
                    </Link>
                    <Text
                      fz={12}
                      c={"#868e96"}
                      fw={600}
                      mt={-10}
                      className="roadmap-domain"
                    >
                      {tabData.domain}
                    </Text>
                  </Stack>
                  <DropdownMenu id={tabData.id} tabValue="roadmap" />
                </Flex>
              </Card>
            </Grid.Col>
          ))
        ) : (
          <Grid.Col>
            <NoRecordsFound />
          </Grid.Col>
        )}
      </Grid>
    </>
  );
};

export default RoadmapList;
