import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { verifyPassword, verifyTwoPart } from "@/lib/auth/userStore";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        mode: { label: "mode", type: "text", default: "password" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        keyId: { label: "Key ID", type: "text" },
        pin: { label: "PIN", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const mode = typeof credentials.mode === "string" ? credentials.mode : "password";

        if (mode === "password") {
          const email = typeof credentials.email === "string" ? credentials.email : "";
          const password = typeof credentials.password === "string" ? credentials.password : "";
          if (!email || !password) return null;
          const user = verifyPassword(email, password);
          if (!user) return null;
          return { id: user.id, email: user.email, name: user.username };
        }

        if (mode === "twopart") {
          const keyId = typeof credentials.keyId === "string" ? credentials.keyId : "";
          const pin = typeof credentials.pin === "string" ? credentials.pin : "";
          if (!keyId || !pin) return null;
          const user = verifyTwoPart(keyId, pin);
          if (!user) return null;
          return { id: user.id, email: user.email, name: user.username };
        }

        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
