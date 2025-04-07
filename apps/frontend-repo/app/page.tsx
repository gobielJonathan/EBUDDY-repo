import type React from "react"

import { Metadata } from "next"
import Client from "./page.client"

export const metadata: Metadata = {
  title: "Auth Page",
  description: "Authentication page with login and register tabs",
}

export default function View() {
  return <Client />
}