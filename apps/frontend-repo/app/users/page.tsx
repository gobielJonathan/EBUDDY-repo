import { Metadata } from "next";
import Client from "./page.client";
import { STORAGE_USER_TOKEN } from "@/constants";
import { cookies } from "next/headers";
import Unauthorized from "@/components/unauthorized";

export const metadata: Metadata = {
  title: "User Page",
  description: "User list page",
};

export default async function View() {
  const cookie = await cookies()

  const response = await fetch(`${process.env.api}/users/me`, {
    headers: {
      "Authorization": cookie.get(STORAGE_USER_TOKEN)?.value || "",
    },
  }).then((res) => res.json());

  if (!response.isAuthenticated) {
    return <Unauthorized />;
  }

  return <Client />;
}
