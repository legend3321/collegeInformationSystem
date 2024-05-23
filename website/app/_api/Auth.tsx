"use server";

import axios from "axios";

export const login = async (username: string, password: string) => {
  console.log(1);
  const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
    username,
    password,
  });
  console.log(response);
  return response;
};
export const register = async (
  email: string,
  password: string,
  username: string,
  first_name: string,
  last_name: string
) => {
  return await axios.post(
    "http://localhost:8000/api/User/",
    {
      username,
      email,
      password,
      first_name,
      last_name,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
