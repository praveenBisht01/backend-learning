import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const registerUser = (data) => authAPI.post("/register", data);

export const loginUser = (data) => authAPI.post("/login", data);

export const getCurrentUser = () => authAPI.post("/get-me");

export default authAPI;
