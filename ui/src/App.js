import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectRoutes from "./helper/ProtectRoutes";
import Home from "./pages/Home";
import SignIn from "./authentication/SignIn";
import RegisterProfileCard from "./authentication/RegisterProfileCard";
import {
  AppLayoutMain,
  AppLayoutAuthentication,
  AppLayoutRegister,
} from "./pages/AppLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayoutAuthentication />,
      children: [
        {
          path: "/",
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
      element: <AppLayoutMain />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "",
          element: "",
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/* // *old method of router*
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication Elem={Register} />} />
          <Route path="/signin" element={<Authentication Elem={SignIn} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
