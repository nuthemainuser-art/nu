// lib/auth/auth.config.ts
import Credentials from "@auth/core/providers/credentials";
import type { AuthConfig } from "@auth/core";

import {
  verifyPassword,
  verifyTwoPart,
} from "@/lib/auth/userStore";

export const authConfig: AuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        mode: { label: "Mode", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        keyId: { label: "Key ID", type: "text" },
        pin: { label: "PIN", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const mode = credentials.mode ?? "password";

        if (mode === "password") {
          const email =
            typeof credentials.email === "string" ? credentials.email : "";
          const password =
            typeof credentials.password === "string" ? credentials.password : "";

          const user = verifyPassword(email, password);
          if (!user) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.username,
          };
        }

        if (mode === "twopart") {
          const keyId =
            typeof credentials.keyId === "string" ? credentials.keyId : "";
          const pin = typeof credentials.pin === "string" ? credentials.pin : "";

          const user = verifyTwoPart(keyId, pin);
          if (!user) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.username,
          };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
};
