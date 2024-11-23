import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../fetch/helper";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import tick from "../assets/tick.png";
import Avatar from "../components/Avatar";
import { truncateUsername } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const deletePromise = deleteUser(userId);
    await toast.promise(deletePromise, {
      loading: "Deleting User...",
      success: "User Deleted Successfully",
      error: "Error Deleting User",
    });
    const newUsers = users.filter((user) => user._id !== userId);
    setUsers(newUsers);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="h-full w-full bg-opacity-60 bg-gray-800 absolute top-0 left-0 z-20 flex justify-center items-center">
      <div className="h-[85%] w-[75%] p-2 bg-opacity-40 bg-black border-2 border-gray-700 rounded-2xl backdrop-blur-sm m-auto shadow-md z-30">
        <p
          onClick={() => navigate(-1)}
          className="hover:underline cursor-pointer float-right font-extralight"
        >
          Close
        </p>
        {loading ? (
          <Loading />
        ) : (
          users?.map((user) => (
            <div
              key={user._id} // Add a unique key for each user
              className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl w-auto "
            >
              <Avatar
                profilePhoto={user.profilePicturePath}
                userId={user._id}
              />
              <div
                onClick={() => navigate(`/home/${user._id}`)}
                className="flex flex-col cursor-pointer"
              >
                <p className="flex gap-1 items-center capitalize">
                  {truncateUsername(user.name)}
                  {user.isAdmin && (
                    <img src={tick} className="h-4 w-4" alt="purpletick" />
                  )}
                </p>
                <p className="text-gray2 text-xs">
                  @{truncateUsername(user.username)}
                </p>
              </div>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="border border-red-700 bg-red-300 bg-opacity-20 rounded-md text-red-700 px-4 py-2"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPage;
