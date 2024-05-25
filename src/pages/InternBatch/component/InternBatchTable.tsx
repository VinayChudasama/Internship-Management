/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetBatchListDataQuery } from "../utility/services/internBatch.service";
import { IInternBatch } from "../utility/models/internbatch.model";
import { Badge, Container, Paper, Table } from "@mantine/core";
import { Link } from "react-router-dom";
import DropdownMenu from "../../../shared/component/DropdownMenu";
import { formatDate } from "date-fns";

const InternBatchTable = () => {
  const { data: BatchData } = useGetBatchListDataQuery();
  const [batchListData, setBatchListData] = useState<IInternBatch[]>([]);

  useEffect(() => {
    if (BatchData) {
      setBatchListData(BatchData);
    }
  }, [BatchData]);

  return (
    <div className="content-wrapper">
      <Paper className="container-bg">
        <Container className="container-fluid">
          <div className="table-container">
            <Table
              className="internshipBatchTable"
              highlightOnHover
              withTableBorder
              withColumnBorders
              mt="md"
            >
              <Table.Thead bg="#f1f3f5">
                <Table.Tr>
                  <Table.Th>BATCH-NAME</Table.Th>
                  <Table.Th>START-DATE</Table.Th>
                  <Table.Th>END-DATE</Table.Th>
                  <Table.Th>STATUS</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody bg={"#fff"}>
                {batchListData &&
                  batchListData.map((tabData) => (
                    <Table.Tr key={tabData.id}>
                      <Table.Td>
                        <Link
                          style={{ textTransform: "uppercase" }}
                          className="text-link"
                          to={`/batch-details/${tabData.id}/details`}
                        >
                          {tabData.batchname}
                        </Link>
                      </Table.Td>
                      <Table.Td>
                        {formatDate(tabData.startdate, "MMM dd, yyyy")}
                      </Table.Td>
                      <Table.Td>
                        {formatDate(tabData.enddate, "MMM dd, yyyy")}
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          variant={
                            tabData.status === "Not-Started"
                              ? "notStarted"
                              : tabData.status === "Completed"
                              ? "completed"
                              : "inProgress"
                          }
                          radius="sm"
                        >
                          {tabData.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        {
                          <DropdownMenu
                            id={tabData.id}
                            tabValue="internBatch"
                          />
                        }
                      </Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          </div>
        </Container>
      </Paper>
    </div>
  );
};

export default InternBatchTable;
