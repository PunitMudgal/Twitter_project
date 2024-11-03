import LeftComp from "../components/homePageComp/LeftComp";
import RightComp from "../components/homePageComp/RightComp";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useFetchHook from "../fetch/fetchHook";
import Loading from "../components/Loading";
import { useRef } from "react";
import { CenterRefProvider } from "../components/CenterRefContext";

function Home() {
  const { isLoading, serverError } = useFetchHook();
  const centerRef = useRef(null); // for controlling center scrolling

  if (serverError)
    return (
      <h1 className="text-xl bg-red-400 text-red-900 p-4 rounded-lg">
        Server Error Please try again...
      </h1>
    );

  if (isLoading) return <Loading />;
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden lg:flex  ">
      <LeftComp />
      <div
        ref={centerRef}
        className="flex flex-col flex-grow col-span-5 border-x border-purple-700 h-full overflow-y-auto lg:col-span-7 "
      >
        <CenterRefProvider centerRef={centerRef}>
          <Outlet />
        </CenterRefProvider>
      </div>
      <RightComp />
    </div>
  );
}

export default Home;
