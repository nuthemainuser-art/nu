import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { sheetId, value } = await req.json();

  const auth = new google.auth.OAuth2();
  auth.setCredentials({
    access_token: session.accessToken,
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    requestBody: { values: [[value]] },
  });

  return NextResponse.json({ ok: true });
}
