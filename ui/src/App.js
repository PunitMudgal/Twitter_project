import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ProtectRoutes from "./helper/ProtectRoutes";
import { Toaster } from "react-hot-toast";
import { AppLayoutAuthentication, AppLayoutRegister } from "./pages/AppLayout";
import CenterComp from "./components/homePageComp/CenterComp";
import Logo from "./assets/blue.png";
import Messenger from "./pages/Messenger";
import { checkAuth } from "./store/authSlice";
import { useDispatch } from "react-redux";
import ViewPhoto from "./components/ViewPhoto";

// const ViewPhoto = lazy(() => import("./components/ViewPhoto"));
const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./authentication/SignIn"));
const RegisterProfileCard = lazy(() =>
  import("./authentication/RegisterProfileCard")
);
const Profile = lazy(() => import("./pages/Profile"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const EditProfileInfoWidget = lazy(() =>
  import("./components/widget/EditProfileInfoWidget")
);
const BookmarkPage = lazy(() => import("./pages/BookmarkPage"));
const FollowerAndFollowing = lazy(() =>
  import("./components/widget/FollowerAndFollowing")
);
const ErrorPage = lazy(() => import("./pages/Error404"));

function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <AppLayoutAuthentication />,
        children: [
          {
            path: "",
            element: <AppLayoutRegister />,
            children: [
              {
                path: "register-profile",
                element: <RegisterProfileCard />,
              },
            ],
          },
          {
            path: "signin",
            element: <SignIn />,
          },
        ],
      },
      {
        path: "home",
        element: (
          <ProtectRoutes>
            <Home />
          </ProtectRoutes>
        ),
        children: [
          {
            path: "",
            element: <CenterComp isLoading={false} />,
          },
          {
            path: ":id",
            element: <Profile />,
            children: [
              {
                path: "edit",
                element: <EditProfileInfoWidget />,
              },
              {
                path: "admin/dashboard",
                element: <AdminPage />,
              },
            ],
          },
          {
            path: ":id/follower&following",
            element: <FollowerAndFollowing />,
          },
          {
            path: "bookmark",
            element: <BookmarkPage />,
          },
        ],
      },
      {
        path: "/messenger",
        element: (
          <ProtectRoutes>
            <Messenger />
          </ProtectRoutes>
        ),
      },
      {
        path: "/:userId/photo/:picturePath",
        element: (
          <ProtectRoutes>
            <ViewPhoto />
          </ProtectRoutes>
        ),
      },

      { path: "*", element: <ErrorPage /> },
    ],
    {
      basename: "/Twitter_project", // for hosting on github to tell base url
    }
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen w-full text-center bg-transparent flex-col">
            <img src={Logo} className="h-32 w-auto" alt="logo" />
            <p className="font-extralight tracking-wider text-xl">FOREVER</p>
          </div>
        }
      >
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
