import axios from "../config/axios";

export const CreateUser = async (userData) => {
  try {
    const res = await axios({
      url: "/auth/register",
      method: "POST",
      data: userData,
    });
    console.log("API response:", res);
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.error("Fail to register");
    throw new Error(error.message);
  }
};

export const LoginUser = async (userData) => {
  try {
    const result = await axios({
      url: "/users/login",
      method: "POST",
      data: userData,
    });
    console.log("API Response from LoginUser:", result);
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function GetUserById(id) {
  try {
    const response = await axios({
      url: `/users/${id}`,
      method: "GET",
    });

    return { userData: response.data };
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error(error.message || "An error occurred while fetching user.");
  }
}

export const GetAllUser = async () => {
  try {
    const response = await axios.get("/users");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export async function UpdateUser({ id, ...userData }) {
  try {
    const response = await axios.put(`/users/update/${id}`, userData);
    console.log("User updated response:", response.data); // Log response to verify update

    return response.data;
  } catch (error) {
    console.error("Error in UpdateUser:", error);
    return { ok: false, error };
  }
}

export const DeleteUser = async (id) => {
  try {
    axios({
      url: "",
      method: "DELETE",
      id,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};

export const changePassword = async (userData) => {
  try {
    const res = axios({
      url: "",
      method: "UPDATE",
      userData,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res.json();
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
