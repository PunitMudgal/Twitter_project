import toast from "react-hot-toast";
import { axiosInstance } from "./axios";
import { connectSocket } from "../store/authSlice";

/** --------- USER --------------- */

/** SEARCH USER */
export async function searchUser(name) {
  try {
    const { data } = await axiosInstance.get(`/user/search/${name}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

/** UPDATE USER */
export async function updateUser(values) {
  try {
    const { data } = await axiosInstance.patch("/user/update", values);
    return data;
  } catch (error) {
    console.error("error response", error);
    toast.error(error.response.data.message);
  }
}

// follow user
export async function follow(friendId) {
  try {
    const { data } = await axiosInstance.put(`/user/${friendId}/follow`);
    return data;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Something went wrong!";
      toast.error(errorMessage);
    } else {
      toast.error("Network error, please try again!");
    }
  }
}

// unfollow user
export async function unfollow(friendId) {
  try {
    const { data } = await axiosInstance.put(`/user/${friendId}/unfollow`);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

// get Friends suggestion
export async function getFriendSuggestion() {
  try {
    const { data } = await axiosInstance.post(`/user/suggestFriends`, {});
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

// Fetch User's friends
export async function getAllFollowing(following) {
  if (following) {
    try {
      const { data } = await axiosInstance.post(`/user/getAllFollowing`, {
        following,
      });
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } else {
    throw new Error("Following list or token is missing");
  }
}

export async function getAllFollower(follower) {
  if (follower) {
    try {
      const { data } = await axiosInstance.post(`/user/getAllFollower`, {
        follower,
      });
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } else {
    throw new Error("follower list or token is missing");
  }
}

/** --------- POSTS  --------------- */

export async function createPost(values) {
  try {
    const { data } = await axiosInstance.post(`/post`, values);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

// export async function createComment(values) {
//   try{
//     const {data} = await axiosInstance.post(`/post`)
//   }
// }

/** */
export async function getFriendPosts(userId, page) {
  try {
    const { data } = await axiosInstance.get(`/post/${userId}/posts`, {
      params: { page, limit: 4 },
    });
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function getFeedPosts(page) {
  try {
    const { data } = await axiosInstance.get(
      `/post/foryou/getAll?page=${page}&limit=5`
    );
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function getFollowingPosts(page) {
  try {
    const { data } = await axiosInstance.get(
      `/post/get-following-posts?page=${page}&limit=5`
    );
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function likeUnlikePost(postId, userId) {
  try {
    const { data } = await axiosInstance.patch(`/post/${postId}/like`, {
      userId,
    });
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function bookmarkPost(postId) {
  try {
    await axiosInstance.patch(`/post/bookmark/${postId}`);
    return;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function getBookmarkedPosts() {
  try {
    const { data } = await axiosInstance.get(`/post/get-bookmared-posts`);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function deletePost(postId, userId) {
  try {
    await axiosInstance.delete(`/post/${postId}/delete`, {
      data: { userId },
    });
    return;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

/** ADMIN DASHBOARD */
export async function getAllUsers() {
  try {
    const { data } = await axiosInstance.post(`/user/admin/get-users`);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function deleteUser(userId) {
  try {
    await axiosInstance.delete(`/user/deleteUser/${userId}`);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const formatTimeTo12Hour = (createdAt) => {
  if (!createdAt) return ""; // Handle missing or invalid dates

  const date = new Date(createdAt);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  const formattedMinutes = minutes.toString().padStart(2, "0"); // Add leading zero to minutes

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const extractDate = (createdAt) => {
  const dateObj = new Date(createdAt);
  return dateObj.toISOString().split("T")[0]; // Extract the date part (YYYY-MM-DD)
};
