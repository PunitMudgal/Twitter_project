import LeftComp from "../components/homePageComp/LeftComp";
import RightComp from "../components/homePageComp/RightComp";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useFetchHook from "../fetch/fetchHook";
import Loading from "../components/Loading";

function Home() {
  const { isLoading, serverError } = useFetchHook();
  const user = useSelector((state) => state.auth.user);

  if (serverError)
    return (
      <h1 className="text-xl bg-red-400 text-red-900 p-4 rounded-lg">
        Server Error Please try again...
      </h1>
    );

  if (isLoading) return <Loading />;
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden  ">
      <LeftComp />
      <div className="relative flex flex-col flex-grow col-span-5 border-x border-purple-700  h-full overflow-y-auto scrollbar-hide md:col-span-9 ">
        <Outlet />
      </div>
      <RightComp />
    </div>
  );
}

export default Home;
