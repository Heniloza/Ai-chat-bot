import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./routes/HomePage/HomePage.jsx";
import DashBoardPage from "./routes/DashBoardPages/DashBoardPage.jsx";
import ChatPage from "./routes/ChatPage/ChatPage.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout.jsx";
import DashBoardLayout from "./layouts/dashboardLayouts/DashBoardLayout.jsx";
import SignUp from "./routes/SignUpPages/SignUpPages.jsx";
import SignInPage from "./routes/SignIn/SignInPage.jsx";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signin/*",
        element: <SignInPage />,
      },
      {
        path: "/signup/*",
        element: <SignUp />,
      },
      {
        element:<DashBoardLayout />,
        children:[
          {
          path:"/dashboard",element:<DashBoardPage />
          },
          {
            path:"/dashboard/chats/:id",element:<ChatPage />
            }

        ]
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
