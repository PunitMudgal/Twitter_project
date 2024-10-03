import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectRoutes from "./helper/ProtectRoutes";
import Home from "./pages/Home";
import SignIn from "./authentication/SignIn";
import RegisterProfileCard from "./authentication/RegisterProfileCard";
import { AppLayoutAuthentication, AppLayoutRegister } from "./pages/AppLayout";
import CenterComp from "./components/homePageComp/CenterComp";
import Profile from "./pages/Profile";
import useFetchHook from "./hook/fetchHook";

function App() {
  const { isLoading, serverError } = useFetchHook();

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
          <Home serverError={serverError} />
        </ProtectRoutes>
      ),
      children: [
        {
          path: "",
          element: <CenterComp isLoading={isLoading} />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
// path: "/home",
// element: "",
// children: [
//   {
//     path: "/",
//     element: <AppLayoutMain />,
//     children: [
//       { path: "/", element: <LeftComp /> },
//       { path: "/", element: <CenterComp /> },
//       { path: "/", element: <RightComp /> },
//     ],
//   },
// ],
