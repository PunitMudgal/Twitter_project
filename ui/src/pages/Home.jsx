import LeftComp from "../components/homePageComp/LeftComp";
import RightComp from "../components/homePageComp/RightComp";
import CenterComp from "../components/homePageComp/CenterComp";
import useFetchHook from "../hook/fetchHook";
import { useSelector } from "react-redux";

function Home() {
  const { isLoading, serverError } = useFetchHook();

  const user = useSelector((state) => state.auth.user);

  if (serverError)
    return (
      <h1 className="text-xl bg-red-400 text-red-900 p-4 rounded-lg">
        Server Error Please try again...
      </h1>
    );
  return (
    <div className="grid grid-cols-12 min-h-[calc(100vh-48px)] w-full overflow-hidden ">
      <LeftComp />
      {!isLoading && <CenterComp isLoading={isLoading} />}
      <RightComp />
    </div>
  );
}

export default Home;
