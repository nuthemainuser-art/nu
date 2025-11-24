"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  async function login(e: any) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/home"
    });
  }

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "auto" }}>
      <h1>Login</h1>

      <form onSubmit={login}>
        <input name="email" placeholder="Email" />
        <br /><br />
        <input name="password" type="password" placeholder="Password" />
        <br /><br />
        <button>Login</button>
      </form>

      <br />

      <button onClick={() => signIn("google", { callbackUrl: "/home" })}>
        Continue with Google
      </button>

      <br /><br />

      <a href="/signup">Create Account</a>

      <br /><br />

      <a href="/home">Continue without login (read-only)</a>
    </div>
  );
}
