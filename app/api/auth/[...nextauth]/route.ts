import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword, verifyTwoPart } from "@/lib/auth/userStore";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
          include_granted_scopes: "true",
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
      credentials: {},
      authorize(credentials) {
        const mode = credentials?.mode ?? "password";
        if (mode === "password")
          return verifyPassword(credentials!.email, credentials!.password);
        return verifyTwoPart(credentials!.keyId, credentials!.pin);
      },
    }),
  ],

  session: { strategy: "jwt" },

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
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
};

// ⬅️ THIS IS THE FIX
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
