import "./index.css";
import { lazy, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";
import { HomeHtml } from "./components/SeoRelatedHtml/HomeHtml";
import { ProjectsHtml } from "./components/SeoRelatedHtml/ProjectsHtml";
import { ContactHtml } from "./components/SeoRelatedHtml/ContactHtml";

const NotFound = lazy(() => import("./components/NotFound"));
const ErrorBoundary = lazy(() => import("./components/ErrorBoundary"));

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomeHtml />,
      },
      {
        path: "/projects",
        element: <ProjectsHtml />,
      },
      {
        path: "/contact",
        element: <ContactHtml />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
