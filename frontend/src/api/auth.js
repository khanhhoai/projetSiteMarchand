import API from "./axios";

export const login = async (username, password) => {
  return await API.post("/auth/login", { username, password });
};
