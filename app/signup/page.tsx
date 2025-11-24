"use client";

export default function SignUp() {
  async function signup(e: any) {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      username: e.target.username.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      password: e.target.password.value
    };

    await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(body)
    });

    window.location.href = "/login";
  }

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "auto" }}>
      <h1>Create Account</h1>

      <form onSubmit={signup}>
        <input name="name" placeholder="Full Name" />
        <br /><br />

        <input name="username" placeholder="Username" />
        <br /><br />

        <input name="phone" placeholder="Phone" />
        <br /><br />

        <input name="email" placeholder="Email" />
        <br /><br />

        <input name="password" type="password" placeholder="Password" />
        <br /><br />

        <button>Create Account</button>
      </form>

      <br />

      <button onClick={() => signIn("google", { callbackUrl: "/home" })}>
        Continue with Google
      </button>

      <br /><br />

      <a href="/home">Continue without signup (read-only)</a>
    </div>
  );
}
