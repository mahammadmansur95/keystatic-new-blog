import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { drive, sheets } from "@/lib/google";

const SHEET_ID :string = process.env.SHEET_ID!;
const DRIVE_FOLDER_ID :string = process.env.DRIVE_FOLDER_ID!;

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const jobRole = formData.get("jobRole") as string;
  const message = formData.get("message") as string;
  const file = formData.get("resume") as File;

  if (!file)
    return NextResponse.json({ error: "Resume file missing" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const tempPath = `/tmp/${uuid()}-${file.name}`;
  await writeFile(tempPath, buffer);

  const res = await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [DRIVE_FOLDER_ID],
    },
    media: {
      mimeType: file.type,
      body: fs.createReadStream(tempPath),
    },
  });

  const fileId = res.data?.id;

  if (!fileId) {
    return NextResponse.json(
      { error: "Drive file upload failed" },
      { status: 500 }
    );
  }

  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

  // Save to Sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[jobRole, fullName, phone, email, fileUrl, message]],
    },
  });

  return NextResponse.json({ success: true, fileUrl });
}
