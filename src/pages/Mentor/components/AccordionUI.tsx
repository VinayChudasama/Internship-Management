import { Accordion, SimpleGrid, Text, Title } from "@mantine/core";

import { IMentor } from "../utility/models/mentor.model";
import { GroupedData } from "../../BatchDetails/utility/groupedData";
import CardUI from "./CardUI";
// import InternCard from "./InternCard";
// import RoadmapCard from "./RoadmapCard";
// import { Domain } from "../utility/enum/shared.enum";

interface IProps {
  data: GroupedData;
  tabValue: string;
  toggleDrawer: () => void;
}

export function AccordionUI({
  data,
  tabValue,
  toggleDrawer,
}: // getData,
IProps) {
  //   Accordion for displaying intern details
  const items = Object.entries(data).map(([domain, items]) => (
    <Accordion.Item
      className="domains-accordion"
      //   style={{ borderBottom: "none", content: { paddingTop: "1rem" } }}
      key={domain}
      value={domain}
    >
      <Accordion.Control
        style={{ flexDirection: "row" }}
        // disabled={data.length === 0}
      >
        <Title ml={10} order={6}>
          {domain} ({items.length})
        </Title>
      </Accordion.Control>
      <Accordion.Panel>
        {items.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, xl: 4 }}>
            {items.map(
              (item) =>
                tabValue === "interns" ? null : tabValue == "mentors" || //   /> //     tabValue={tabValue} //     toggleDrawer={toggleDrawer} //     intern={item} //     key={item.id} //   <InternCard
                  tabValue == "batchMentors" ? (
                  <CardUI
                    key={item.id}
                    data={item}
                    toggleDrawer={toggleDrawer}
                    tabValue={tabValue}
                    // mentorData={getData}
                  />
                ) : null
              //   <RoadmapCard
              //     key={item.id}
              //     data={item}
              //     toggleDrawer={toggleDrawer}
              //     tabValue={tabValue}
              //   />
              // <CardUI key={item.id} data={item} /> // Render null for any other case
            )}
          </SimpleGrid>
        ) : (
          <Text>No Records Found</Text>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion defaultValue={Object.keys(data)[0]}>{items}</Accordion>;
}
