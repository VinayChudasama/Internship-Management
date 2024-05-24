import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { resolver, theme } from "./core/utility/constant/core.constant.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider theme={theme} cssVariablesResolver={resolver}>
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
