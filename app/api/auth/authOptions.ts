import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword, verifyTwoPart } from "@/lib/auth/userStore";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/script.projects",
            "https://www.googleapis.com/auth/script.deployments",
            "https://www.googleapis.com/auth/script.scriptapp",
          ].join(" "),
        },
      },
    }),

    CredentialsProvider({
      name: "Streamforge Login",
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
          const user = verifyPassword(credentials.email!, credentials.password!);
          return user ? { id: user.id, email: user.email, name: user.username } : null;
        }

        if (mode === "twopart") {
          const user = verifyTwoPart(credentials.keyId!, credentials.pin!);
          return user ? { id: user.id, email: user.email, name: user.username } : null;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) token.user = user;

      if (account?.provider === "google") {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },

async session({ session, token }) {
  if (token.user && typeof token.user === "object") {
    session.user = token.user as any;
  }
  session.accessToken = token.accessToken as string | undefined;
  session.refreshToken = token.refreshToken as string | undefined;
  return session;
},
  },

  secret: process.env.AUTH_SECRET!,
};
