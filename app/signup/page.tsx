// app/signup/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enableTwoPart, setEnableTwoPart] = useState(false);

  const [keyId, setKeyId] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setKeyId(null);
    setPin(null);
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          enableTwoPart,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      if (data.keyId && data.pin) {
        setKeyId(data.keyId);
        setPin(data.pin);
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message ?? "Signup failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a, #020617 50%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        color: "#e5e7eb",
        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(15,23,42,0.9)",
          borderRadius: 16,
          border: "1px solid rgba(148,163,184,0.45)",
          boxShadow: "0 24px 80px rgba(15,23,42,0.8)",
          padding: 24,
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 8, fontSize: 22 }}>
          Create Nu / Streamforge account
        </h1>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: 12, marginTop: 8 }}>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <label style={{ display: "block", fontSize: 12, marginTop: 8 }}>
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />

          <label style={{ display: "block", fontSize: 12, marginTop: 8 }}>
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            type="password"
            required
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              marginTop: 10,
            }}
          >
            <input
              type="checkbox"
              checked={enableTwoPart}
              onChange={(e) => setEnableTwoPart(e.target.checked)}
              style={{ width: 14, height: 14 }}
            />
            Enable 2-part key (Key ID + PIN) login
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 14,
              width: "100%",
              padding: "8px 12px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: "#38bdf8",
              color: "#020617",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {error && (
          <div
            style={{
              marginTop: 10,
              fontSize: 12,
              color: "#fecaca",
            }}
          >
            {error}
          </div>
        )}

        {keyId && pin && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 12,
              background: "#111827",
              border: "1px dashed #4b5563",
              fontSize: 12,
            }}
          >
            <div style={{ marginBottom: 4, color: "#a5f3fc" }}>
              Your 2-part key
            </div>
            <div>Key ID: <strong>{keyId}</strong></div>
            <div>PIN: <strong>{pin}</strong></div>
            <div style={{ marginTop: 6, color: "#9ca3af" }}>
              Save this securely. You&apos;ll use it on the login screen under
              &quot;2-part key&quot;.
            </div>
            <button
              onClick={() => router.push("/login")}
              style={{
                marginTop: 10,
                borderRadius: 999,
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: 12,
                background: "#38bdf8",
                color: "#020617",
              }}
            >
              Go to login →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 4,
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid #1f2937",
  background: "#020617",
  color: "#e5e7eb",
  fontSize: 13,
};
