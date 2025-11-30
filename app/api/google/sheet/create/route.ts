import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);
  console.log("🔥 /api/google/sheet/create HIT");
  console.log("🟢 SESSION:", session);

  if (!session?.accessToken) {
    console.log("❌ No access token in session");
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({
    access_token: session.accessToken,
  });

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: { title: "Streamforge Test Sheet" },
        sheets: [
          {
            properties: { title: "Sheet1" },
            data: [
              {
                rowData: [
                  {
                    values: [
                      { userEnteredValue: { stringValue: "test column" } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    const sheetId = response.data.spreadsheetId;
    return NextResponse.json({ sheetId });
  } catch (err) {
    console.error("❌ Google API ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
