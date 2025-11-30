// app/login/page.tsx
"use client";

import React, { useState } from "react";// ❌ WRONG
// import { signIn } from "next-auth/react";

// ✅ RIGHTimport { signIn } from "@auth/nextjs/client";

import { signIn } from "next-auth/react";


import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mode, setMode] = useState<"password" | "twopart">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyId, setKeyId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      mode,
      email,
      password,
      keyId,
      pin,
      callbackUrl: "/home",
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/home");
    }
  }

  async function handleGoogle() {
    await signIn("google", { callbackUrl: "/home" });
  }

  function continueReadOnly() {
    router.push("/home?readonly=1");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(15,23,42,0.9)",
          borderRadius: 16,
          border: "1px solid rgba(148,163,184,0.4)",
          padding: 24,
          color: "#e5e7eb",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>Nu / Streamforge</h1>
        <p style={{ marginTop: 0, marginBottom: 16, fontSize: 14 }}>
          Sign in with Google, password, or your two-part key — or just explore in read-only.
        </p>

        {/* MODE SWITCH */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: "#9ca3af" }}>Auth mode</label>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <ModeButton
              label="Email + password"
              active={mode === "password"}
              onClick={() => setMode("password")}
            />
            <ModeButton
              label="Two-part key"
              active={mode === "twopart"}
              onClick={() => setMode("twopart")}
            />
          </div>
        </div>

        {/* MAIN FORM */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 10, marginBottom: 8 }}
        >
          {mode === "password" && (
            <>
              <Field label="Email">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />
              </Field>
            </>
          )}

          {mode === "twopart" && (
            <>
              <Field label="Key ID">
                <input
                  required
                  value={keyId}
                  onChange={(e) => setKeyId(e.target.value)}
                  style={inputStyle}
                />
              </Field>
              <Field label="PIN">
                <input
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  style={inputStyle}
                />
              </Field>
            </>
          )}

          {error && (
            <div
              style={{
                fontSize: 12,
                color: "#fecaca",
                background: "rgba(127,29,29,0.5)",
                borderRadius: 8,
                padding: 8,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              marginTop: 4,
              padding: "8px 12px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg, #34d399, #22c55e)",
              color: "#022c22",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </form>

        {/* OTHER OPTIONS */}
        <div
          style={{
            marginTop: 12,
            borderTop: "1px solid rgba(55,65,81,0.7)",
            paddingTop: 12,
            display: "grid",
            gap: 8,
          }}
        >
          <button
            type="button"
            onClick={handleGoogle}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid #374151",
              background: "transparent",
              color: "#e5e7eb",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Continue with Google
          </button>

          <button
            type="button"
            onClick={continueReadOnly}
            style={{
              width: "100%",
              padding: "6px 12px",
              borderRadius: 999,
              border: "none",
              background: "transparent",
              color: "#9ca3af",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Continue in read-only mode
          </button>
        </div>
      </div>
    </div>
  );
}

function ModeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        padding: "6px 8px",
        borderRadius: 999,
        border: "1px solid #374151",
        background: active ? "#111827" : "transparent",
        color: active ? "#9fe8d6" : "#9ca3af",
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          color: "#9ca3af",
          marginBottom: 2,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid #374151",
  background: "#020617",
  color: "#e5e7eb",
  fontSize: 13,
};
