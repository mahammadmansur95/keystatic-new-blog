import { google } from "googleapis";

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64!, 'base64').toString()
);

console.log("credentials", credentials);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export const drive = google.drive({ version: "v3", auth });
export const sheets = google.sheets({ version: "v4", auth });
