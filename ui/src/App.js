import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectRoutes from "./helper/ProtectRoutes";
import Home from "./pages/Home";
import SignIn from "./authentication/SignIn";
import RegisterProfileCard from "./authentication/RegisterProfileCard";
import { AppLayoutAuthentication, AppLayoutRegister } from "./pages/AppLayout";
import CenterComp from "./components/homePageComp/CenterComp";
import Profile from "./pages/Profile";
import useFetchHook from "./hook/fetchHook";
import ViewPhoto from "./components/ViewPhoto";
import EditProfileInfoWidget from "./components/widget/EditProfileInfoWidget";
import { Toaster } from "react-hot-toast";

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
          ],
        },
      ],
    },
    {
      path: "/:userId/photo",
      element: (
        <ProtectRoutes>
          <ViewPhoto />
        </ProtectRoutes>
      ),
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
