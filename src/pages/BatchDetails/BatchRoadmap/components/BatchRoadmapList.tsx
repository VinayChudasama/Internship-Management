import { useEffect, useState } from "react";
import { IBatchRoadmap } from "../utility/models/batchroadmap.model";
import RoadmapCard from "../../../../shared/component/RoadmapCard";
import { Grid } from "@mantine/core";
import NoRecordsFound from "../../../../shared/component/NoRecordsFound";

interface IProps {
  batchRoadmapData: IBatchRoadmap[];
  toggleDrawer: () => void;
}
const BatchRoadmapList = ({ batchRoadmapData, toggleDrawer }: IProps) => {
  const [batchRoadmaps, setBatchRoadmaps] = useState<IBatchRoadmap[] | []>([]);

  useEffect(() => {
    if (batchRoadmapData) {
      setBatchRoadmaps(batchRoadmapData);
    }
  }, [batchRoadmapData]);
  console.log("BatchZRoadmap Data:", batchRoadmaps, toggleDrawer);

  return (
    <>
      <Grid pb="md">
        {batchRoadmaps && batchRoadmaps.length > 0 ? (
          batchRoadmaps.map((batchRoadmap: IBatchRoadmap) => (
            <Grid.Col span={3} key={batchRoadmap.id}>
              <RoadmapCard data={batchRoadmap} type="batch-roadmap" />
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

export default BatchRoadmapList;
