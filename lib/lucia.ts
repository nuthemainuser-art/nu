import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { db } from "./db";

export const lucia = new Lucia(new libsql(db, {
  user: "users",
  session: "sessions"
}), {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (data) => ({
    name: data.name,
    email: data.email,
    username: data.username
  })
});

export type Auth = typeof lucia;
