"use server";

import { login as loginRegular } from "./login";

export async function login(prevState: object, formData: FormData) {
  return loginRegular(prevState, formData, true, "/admin");
}
