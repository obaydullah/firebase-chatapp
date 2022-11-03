import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Notification from "./pages/Notification";
import Settings from "./pages/Settings";

//Private Routes
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import PrivateLogin from "./PrivateRoutes/PrivateLogin";
import PrivateRegistration from "./PrivateRoutes/PrivateRegistration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/registration",
    element: <PrivateRegistration />,
  },
  {
    path: "/login",
    element: <PrivateLogin />,
  },
  {
    path: "/message",
    element: <Message />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
