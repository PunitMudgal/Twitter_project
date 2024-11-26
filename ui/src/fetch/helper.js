import toast from "react-hot-toast";
import { axiosInstance } from "./axios";

/** --------- USER --------------- */

/** REGISTER USER */
export async function registerUser(userData) {
  try {
    const response = await axiosInstance.post(`/auth/register`, userData);
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

/** LOGIN USER */
export async function loginUser({ emailOrUsername, password }) {
  try {
    const { data } = await axiosInstance.post("/auth/login", {
      emailOrUsername,
      password,
    });
    return Promise.resolve({ data });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function Logout() {
  try {
    await axiosInstance.get("/auth/logout");
    toast.success("Logout Successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

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
export async function follow(userId, friendId) {
  try {
    const { data } = await axiosInstance.put(`/user/${friendId}/follow`, {
      userId,
    });
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

// unfollow user
export async function unfollow(userId, friendId) {
  try {
    const { data } = await axiosInstance.put(`/user/${friendId}/unfollow`, {
      userId,
    });
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
