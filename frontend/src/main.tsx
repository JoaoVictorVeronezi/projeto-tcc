import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./pages/main/Main.tsx";
import Insights from "./pages/insights/Insights.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/insights",
    element: <Insights />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
