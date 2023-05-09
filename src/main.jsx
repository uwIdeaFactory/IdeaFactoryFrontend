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
import UserProfileUpdatePage from './UserProfileUpdatePage.jsx';
import SignIn from './auth/SignIn.jsx'
import SignUp from './auth/SignUp.jsx'
import AuthDetails from './auth/AuthDetails.jsx'
import FormTesting from './components/FormTesting.jsx';
import { AuthProvider } from './AuthContext.jsx'
import ProjectPage from './ProjectPage.jsx';
const router = createBrowserRouter([
  {
    path: "/userProfile/:uid",
    element: <UserProfile></UserProfile>
  },
  {
    path: "/projectUpload",
    element: <ProjectUploadPage></ProjectUploadPage>
  },
  {
    path: "/userProfileUpdate",
    element: <UserProfileUpdatePage></UserProfileUpdatePage>
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
  },
  {
    path: "/test",
    element: <FormTesting />,
  },
  {
    path: "/projects/:pid",
    element: <ProjectPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {console.log("Auth provider")}
    <RouterProvider router={router} />
  </AuthProvider>

);
