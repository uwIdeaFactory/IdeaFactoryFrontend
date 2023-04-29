import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './MainPage.jsx';
import UserProfile from './UserProfile.jsx';
import ProjectUploadPage from './ProjectUploadPage.jsx';
import SignIn from './components/auth/SignIn.jsx'
import SignUp from './components/auth/SignUp.jsx'
import AuthDetails from './components/auth/AuthDetails.jsx'

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <MainPage />,
  },
  {
    path: "/userProfile",
    element: <UserProfile></UserProfile>
  },
  {
    path: "/projectUpload",
    element: <ProjectUploadPage></ProjectUploadPage>
  },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/authDetails",
    element: <AuthDetails />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
