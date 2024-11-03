import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:1414";

export async function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Token not found!");
  let decode = jwtDecode(token);
  return decode;
}

/** --------- USER --------------- */

/** REGISTER USER */
export async function registerUser(userData) {
  try {
    const response = await axios.post(`/auth/register`, userData);
    return response;
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** LOGIN USER */
export async function loginUser({ emailOrUsername, password }) {
  try {
    const { data } = await axios.post("/auth/login", {
      emailOrUsername,
      password,
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Wrong Credentials" });
  }
}

/** SEARCH USER */
export async function searchUser(name, token) {
  try {
    const { data } = await axios.get(`/user/search/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data in seacth funciton ", data);
    return data;
  } catch (error) {}
}

/** UPDATE USER */
export async function updateUser(values, token) {
  try {
    await axios.patch("/user/update", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (error) {
    console.error("error response", error);
    throw new Error("Wrong Credentials");
  }
}

// follow user
export async function follow(userId, friendId, token) {
  try {
    const { data } = await axios.put(
      `/user/${friendId}/follow`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("msg", data.message);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

// unfollow user
export async function unfollow(userId, friendId, token) {
  try {
    const { message } = await axios.put(
      `/user/${friendId}/unfollow`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return message;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while following the user."
    );
  }
}

// get Friends suggestion
export async function getFriendSuggestion(token) {
  try {
    const { data } = await axios.post(
      `user/suggestFriends`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Wrong credentials", error);
  }
}

// Fetch User's friends
export async function getAllFollowing(following, token) {
  if (following && token) {
    try {
      const { data } = await axios.post(
        `user/getAllFollowing`,
        { following },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error("Wrong Credentials");
    }
  } else {
    throw new Error("Following list or token is missing");
  }
}

export async function getAllFollower(follower, token) {
  if (follower && token) {
    try {
      const { data } = await axios.post(
        `user/getAllFollower`,
        { follower },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error("Wrong Credentials");
    }
  } else {
    throw new Error("follower list or token is missing");
  }
}

/** --------- POSTS  --------------- */

export async function createPost(values, token) {
  try {
    const { data } = await axios.post(`/post`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data after creating post", data);
  } catch (error) {
    throw new Error("Error while creating post");
  }
}

/** */
export async function getFriendPosts(userId, token, page) {
  try {
    const { data } = await axios.get(`/post/${userId}/posts`, {
      params: { page, limit: 4 },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Error while fetching user post");
  }
}

export async function getFeedPosts(page) {
  try {
    const { data } = await axios.get(
      `/post/foryou/getAll?page=${page}&limit=5`
    );
    return data;
  } catch (error) {
    throw new Error("Error while fetching feed post");
  }
}

export async function getFollowingPosts(page, userId, token) {
  try {
    const { data } = await axios.get(
      `/post/following/${userId}?page=${page}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Error while fetching feed post");
  }
}

export async function likeUnlikePost(postId, userId, token) {
  try {
    const { data } = await axios.patch(
      `/post/${postId}/like`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Error while liking post");
  }
}

export async function bookmarkPost(postId, userId, token) {
  try {
    await axios.patch(
      `/post/bookmark/${postId}`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return;
  } catch (err) {
    throw new Error("Error while saving (bookmark) post");
  }
}

export async function deletePost(postId, userId, token) {
  try {
    await axios.delete(`/post/${postId}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { userId },
    });
    return;
  } catch (error) {
    throw new Error("Error while deleting post");
  }
}

/** ADMIN DASHBOARD */
export async function getAllUsers(token) {
  try {
    const { data } = await axios.post(
      `/user/admin/get-users`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {}
}

export async function deleteUser(userId, token) {
  try {
    await axios.delete(`/user/deleteUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error while deleting user");
  }
}
