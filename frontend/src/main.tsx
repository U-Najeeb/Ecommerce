import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider, theme } from "./muiTheme/muiTheme.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <CustomThemeProvider theme={theme}>
          <App />
        </CustomThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
);
