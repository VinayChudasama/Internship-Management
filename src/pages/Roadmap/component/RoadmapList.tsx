import { useEffect, useState } from "react";
import { useGetRoadMapDataQuery } from "../utility/services/roadmap.service";
import { IRoadmapData } from "../utility/models/roadmap.model";
import { Grid } from "@mantine/core";
import NoRecordsFound from "../../../shared/component/NoRecordsFound";
import RoadmapCard from "../../../shared/component/RoadmapCard";

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
          roadmapList.map((roadmap: IRoadmapData) => (
            <Grid.Col span={3} key={roadmap.id}>
              <RoadmapCard data={roadmap} type="roadmap" />
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
