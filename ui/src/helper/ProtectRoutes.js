import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Logo from "../assets/blue.png";

export default function ProtectRoutes({ children }) {
  const { user, isCheckingAuth } = useSelector((state) => state.auth);

  // Show a loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-transparent flex-col text-center">
        <img src={Logo} className="h-32 w-auto" alt="logo" />
        <p className="font-extralight tracking-wider marker text-xl">FOREVER</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
