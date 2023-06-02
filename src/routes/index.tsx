import { lazy, startTransition } from "react";
import { createBrowserRouter } from "react-router-dom";
import SearchView from "../views/Search/SearchView";
import User from "../views/User/User";

const ProtectedRoute = lazy(() => import("../components/container/ProtectedRoute"));
const HomeView = lazy(() => import("../views/Home/HomeView"));
const SignupView = lazy(() => import("../views/Signup/SignupView"));
const SigninView = lazy(() => import("../views/Signin/SigninView"));
const Layout = lazy(() => import("../components/parts/Layout"));
const FeedsView = lazy(() => import("../views/Feed/FeedsView"));
const UploadSongView = lazy(() => import("../views/UploadSong/UploadSongView"));
const NotFound = lazy(() => import("../views/Error/NotFound"));

startTransition
export default createBrowserRouter([
  {
    errorElement: <NotFound />,
    path: "welcome",
    element: <ProtectedRoute reversed={true} />,
    children: [
      {
        index: true,
        path: "",
        element: <HomeView />,
      },
    ],
  },
  {
    errorElement: <NotFound />,
    path: "signup",
    element: <ProtectedRoute reversed={true} />,
    children: [
      {
        index: true,
        path: "",
        element: <SignupView />
      }
    ]
  },
  {
    errorElement: <NotFound />,
    path: "signin",
    element: <ProtectedRoute reversed={true} />,
    children: [
      {
        index: true,
        path: "",
        element: <SigninView />
      }
    ]
  },
  {
    path: "",
    errorElement: <NotFound />,
    element: <Layout />,
    children: [
      {
        index: true,
        path: "",
        element: <FeedsView />
      },
      {
        path: "search",
        element: <SearchView />
      },
      {
        path: "upload",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            path: "",
            element: <UploadSongView />
          }
        ]
      },
      {
        path: ":uid",
        element: <User />,
      }
    ],
  },
]);
