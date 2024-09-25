import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import { HomeHtml } from "./components/SeoRelatedHtml/HomeHtml";
import { ProjectsHtml } from "./components/SeoRelatedHtml/ProjectsHtml";
import { ContactHtml } from "./components/SeoRelatedHtml/ContactHtml";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <HomeHtml />
      </>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/projects",
    element: (
      <>
        <App />
        <ProjectsHtml />
      </>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/contact",
    element: (
      <>
        <App />
        <ContactHtml />
      </>
    ),
    errorElement: <ErrorBoundary />,
  },
  { path: "*", element: <NotFound />, errorElement: <ErrorBoundary /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
