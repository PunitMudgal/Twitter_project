import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectRoutes from "./helper/ProtectRoutes";
import { Toaster } from "react-hot-toast";
import { AppLayoutAuthentication, AppLayoutRegister } from "./pages/AppLayout";
import CenterComp from "./components/homePageComp/CenterComp";
import Logo from "./assets/blue.png";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./authentication/SignIn"));
const RegisterProfileCard = lazy(() =>
  import("./authentication/RegisterProfileCard")
);
const Profile = lazy(() => import("./pages/Profile"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ViewPhoto = lazy(() => import("./components/ViewPhoto"));
const EditProfileInfoWidget = lazy(() =>
  import("./components/widget/EditProfileInfoWidget")
);
const FollowerAndFollowing = lazy(() =>
  import("./components/widget/FollowerAndFollowing")
);
const ErrorPage = lazy(() => import("./pages/Error404"));

function App() {
  const router = createBrowserRouter([
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
      ],
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
  ]);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen w-full bg-transparent flex-col">
            <img src={Logo} className="h-32 w-auto" alt="logo" />
            <p className="font-bold font-style2 text-xl">FOREVER</p>
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
