import { users } from "@/lib/users";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { name, username, phone, email, password } = await req.json();

  if (!email || !password)
    return new Response("Missing fields", { status: 400 });

  const exists = users.find((u) => u.email === email);
  if (exists)
    return new Response("User already exists", { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: crypto.randomUUID(),
    name,
    username,
    phone,
    email,
    password: hashed
  };

  users.push(user);

  return new Response("OK", { status: 200 });
}
