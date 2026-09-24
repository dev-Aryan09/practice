import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "./auth/pages/Register";
import Profile from "./auth/pages/Profile";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
