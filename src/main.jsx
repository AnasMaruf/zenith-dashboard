import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/LoginPage";
import SettingPage from "./pages/dashboard/SettingPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DataFetching from "./pages/dashboard/DataFetching";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/setting",
        element: <SettingPage />,
      },
      {
        path: "/dashboard/data-fetching",
        element: <DataFetching />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
