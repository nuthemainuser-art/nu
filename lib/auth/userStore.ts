// lib/auth/userStore.ts

export type NuUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  passwordHash: string; // plaintext for demo
  keyId?: string;
  pin?: string;
};

// --- DEMO USER DATABASE (replace with Supabase or Postgres later) ---
let users: NuUser[] = [
  {
    id: "1",
    email: "demo@example.com",
    username: "demo",
    name: "Demo User",
    passwordHash: "demo1234",
    keyId: "DEMO-KEY",
    pin: "123456",
  },
];

// ---------------------------------------------------------------
// FINDERS
// ---------------------------------------------------------------

export function findUserByEmail(email: string): NuUser | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserByKey(keyId: string, pin: string): NuUser | undefined {
  return users.find((u) => u.keyId === keyId && u.pin === pin);
}

// ---------------------------------------------------------------
// VERIFICATION
// ---------------------------------------------------------------

export function verifyPassword(email: string, password: string): NuUser | null {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (user.passwordHash !== password) return null;
  return user;
}

export function verifyTwoPart(keyId: string, pin: string): NuUser | null {
  const user = findUserByKey(keyId, pin);
  return user ?? null;
}

// ---------------------------------------------------------------
// USER CREATION (Signup)
// ---------------------------------------------------------------

export function createUser(data: {
  email: string;
  username: string;
  name: string;
  password: string;
  enableTwoPart?: boolean;
}): { user: NuUser; keyId?: string; pin?: string } {
  const existing = findUserByEmail(data.email);
  if (existing) throw new Error("User already exists");

  const id = String(Date.now());

  let keyId: string | undefined;
  let pin: string | undefined;

  if (data.enableTwoPart) {
    keyId = Math.random().toString(36).slice(2, 10).toUpperCase();
    pin = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit pin
  }

  const newUser: NuUser = {
    id,
    email: data.email,
    username: data.username,
    name: data.name,
    passwordHash: data.password,
    keyId,
    pin,
  };

  users.push(newUser);
  return { user: newUser, keyId, pin };
}
