
import "./App.css";
import { Flex } from "@mantine/core";
import Sidebar from "./core/sidebar/Sidebar";
import Routing from "./App.routes";
import Header from "./core/header/Header";

function App() {

  return (
    <>
      <Flex className="main-wrapper">
        <Sidebar />
        <Flex
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          direction="column"
        >
          <Header />
          <Routing></Routing>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
