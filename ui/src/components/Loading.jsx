import spinner from "../assets/spinner2.svg";

function Loading() {
  return <img className="m-auto h-12 w-auto p-1" src={spinner} alt="loader" />;
}

export default Loading;

export const ContactsLoading = () => {
  return (
    <div className="space-y-2 p-1">
      <div className="bg-gray-700 opacity-45 rounded-3xl  w-full h-[64px] " />
      <div className="bg-gray-700 opacity-35 rounded-3xl p-2 w-full h-[64px] " />
      <div className="bg-gray-700 opacity-45 rounded-3xl p-2 w-full h-[64px] " />
      <div className="bg-gray-700 opacity-35 rounded-3xl p-2 w-full h-[64px] " />
    </div>
  );
};
