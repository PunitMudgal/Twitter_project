import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:1414";

export async function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Token not found!");
  let decode = jwtDecode(token);
  return decode;
}

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
    await axios.put(
      `/user/${friendId}/follow`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while following the user."
    );
  }
}

// unfollow user
export async function unfollow(userId, friendId, token) {
  try {
    await axios.put(
      `/user/${friendId}/unfollow`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while following the user."
    );
  }
}

// get Friends suggestion
export async function getFriendSuggestion(userId, token) {
  try {
    const { data } = await axios.get(`user/suggestFriends/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Wrong credentials");
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
