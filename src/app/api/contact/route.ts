import { NextRequest, NextResponse } from 'next/server';
import { sheets } from '@/lib/google';

const CONTACT_SHEET_ID = process.env.CONTACT_SHEET_ID!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, phone, email, designation, message } = body;

  if (!fullName || !phone || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: CONTACT_SHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[fullName, phone, email, designation || '', message || '']],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
