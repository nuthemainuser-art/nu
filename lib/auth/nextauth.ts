// lib/auth/nextauth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword, verifyTwoPart, NuUser } from "./userStore";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    // --- Google SSO ---
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    // --- Credentials: email+password OR two-part key ---
    Credentials({
      id: "nu-credentials",
      name: "Nu Credentials",
      credentials: {
        mode: { label: "Mode", type: "text" }, // "password" or "twopart"
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        keyId: { label: "Key ID", type: "text" },
        pin: { label: "PIN", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const modeRaw = credentials.mode;
        const mode = typeof modeRaw === "string" && modeRaw.length > 0 ? modeRaw : "password";

        if (mode === "password") {
          const email = typeof credentials.email === "string" ? credentials.email : undefined;
          const password = typeof credentials.password === "string" ? credentials.password : undefined;

          if (!email || !password) return null;

          const user: NuUser | null = verifyPassword(email, password);
          if (!user) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.username,
          };
        }

        if (mode === "twopart") {
          const keyId = typeof credentials.keyId === "string" ? credentials.keyId : undefined;
          const pin = typeof credentials.pin === "string" ? credentials.pin : undefined;

          if (!keyId || !pin) return null;

          const user: NuUser | null = verifyTwoPart(keyId, pin);
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

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
