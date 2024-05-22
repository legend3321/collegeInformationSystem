"use server";

import axios from "axios";

export const login = async (email: string, password: string) => {
  console.log(1);
  const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
    email,
    password,
  });
  console.log(response);
  return response;
};
export const register = async (email: string, password: string) => {
  return await axios.post("http://localhost:3000/api/register", {
    email,
    password,
  });
};
