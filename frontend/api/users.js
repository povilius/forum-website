import axios from "axios"
import { API } from "./consts"

export const fetchUsers = async () => {
  const response = await axios.get(`${API}/users`)
  return response.data;
}

export const createUser = async (user) => {
  // {username, email, password}
  const response = await axios.post(`${API}/register`, user)
  return response.data
}


export const loginUser = async (loggingUser) => {
  // { username, password }
  try {
    const response = await axios.post(`${API}/login`, loggingUser);
    return response.data;
  } catch (error) {
    console.error("Error logging in user", error);
    return null;
  }
};

