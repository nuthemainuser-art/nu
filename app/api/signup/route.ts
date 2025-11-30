// app/api/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/auth/userStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, username, name, password } = body;

    if (!email || !username || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { user } = createUser({
      email,
      username,
      name,
      password,
    });

    return NextResponse.json(
      { success: true, user: { id: user.id, email: user.email } },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Signup failed" },
      { status: 500 }
    );
  }
}
