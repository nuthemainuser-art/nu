import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // --- FIX: narrow null → undefined ---
  const { searchParams } = new URL(req.url);
  const sheetId = searchParams.get("sheetId") ?? undefined;

  if (!sheetId)
    return NextResponse.json({ error: "Missing sheetId" }, { status: 400 });

  const auth = new google.auth.OAuth2();
  auth.setCredentials({
    access_token: session.accessToken,
  });

  const sheets = google.sheets({ version: "v4", auth });

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Sheet1",
  });

  return NextResponse.json({ rows: result.data.values || [] });
}
