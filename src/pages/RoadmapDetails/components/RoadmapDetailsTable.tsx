/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRoadMapDetailsQuery } from "../utility/services/roadmapdetails.service";
import { Table, Text } from "@mantine/core";

import DropdownMenu from "../../../shared/component/DropdownMenu";
import { IRoadmapDetails } from "../utility/models/roadmapdetails.model";

const RoadmapDetailsTable = () => {
  const { roadmapId } = useParams();
  const [records, setRecords] = useState<IRoadmapDetails[]>([]);
  const { data: roadmapDetailsData } = useGetRoadMapDetailsQuery();

  useEffect(() => {
    if (roadmapDetailsData) {
      setRecords(
        roadmapDetailsData.filter((record) => record.roadmapId == roadmapId)
      );
    }
  }, [roadmapDetailsData]);

  // Creating Table Rows
  const renderTableRows = () => {
    const rows: ReactNode[] = [];
    records.forEach((user) => {
      const rowspan = user.topics.length;
      user.topics.forEach((topic, topicIndex) => {
        rows.push(
          <Table.Tr key={`${user.id}_${topicIndex}`}>
            {topicIndex === 0 ? (
              <Table.Td
                style={{ textWrap: "nowrap" }}
                className="day"
                rowSpan={rowspan}
              >
                {user.day}
              </Table.Td>
            ) : null}

            <Table.Td
              style={{ textWrap: "nowrap" }}
              fw={500}
              className="topic-name"
            >
              {topic.topicName}
            </Table.Td>
            <Table.Td className="subtopic-name">{topic.subtopic}</Table.Td>
            <Table.Td className="duration">{topic.duration}</Table.Td>
            <Table.Td>
              <DropdownMenu
                id={user.id}
                tabValue="roadmapDetails"
                toggleDrawer={() => {}}
              />
            </Table.Td>
          </Table.Tr>
        );
      });
    });
    return rows;
  };
  return (
    <Table
      className="roadmapDetail-table"
      stickyHeader
      stickyHeaderOffset={-16}
      highlightOnHover
      withTableBorder
      withColumnBorders
      mt="md"
    >
      <Table.Thead bg="#f1f3f5">
        <Table.Tr>
          <Table.Th>DAY</Table.Th>
          <Table.Th>TOPIC</Table.Th>
          <Table.Th>SUB-TOPIC</Table.Th>
          <Table.Th>DURATION</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody bg={"#fff"}>
        {records.length == 0 ? (
          <Table.Tr>
            <Table.Td colSpan={5}>
              <Text ta="center"> No Records Found</Text>
            </Table.Td>
          </Table.Tr>
        ) : (
          <>{renderTableRows()}</>
        )}
      </Table.Tbody>
    </Table>
  );
};

export default RoadmapDetailsTable;
