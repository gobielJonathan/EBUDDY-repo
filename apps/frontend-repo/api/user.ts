import { User } from "@ebuddy/core/entities/user";

import { STORAGE_USER_TOKEN } from "@/constants";
import Cookies from 'js-cookie'

export async function login(email: string, password: string) {
  return await fetch(process.env.api + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export async function register(email: string, password: string) {
  return await fetch(process.env.api + "/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export async function getUsers() {
  return await fetch(process.env.api + "/users/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get(STORAGE_USER_TOKEN),
    },
  });
}


export async function editUser(user: User) {
  return await fetch(process.env.api + "/users/" + user.id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get(STORAGE_USER_TOKEN),
    },
    body: JSON.stringify(user)
  });
}
