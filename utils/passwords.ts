"use server";

import crypto from "crypto";

export async function hashPassword(password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      const hash = crypto.createHash("sha256").update(password).digest("hex");
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
}
