import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotFound from "./components/NotFound.jsx";
import { HomeHtml } from "./components/SeoRelatedHtml/HomeHtml.jsx";
import { ProjectsHtml } from "./components/SeoRelatedHtml/ProjectsHtml.jsx";
import { ContactHtml } from "./components/SeoRelatedHtml/ContactHtml.jsx";

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
