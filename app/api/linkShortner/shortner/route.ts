
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { originalUrl } = await req.json();

    if (!originalUrl || typeof originalUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    const ulvisResponse = await fetch(
      `https://ulvis.net/api.php?url=${encodeURIComponent(originalUrl)}`
    );

    if (!ulvisResponse.ok) {
      return NextResponse.json({ error: 'Failed to shorten the URL' }, { status: 500 });
    }

    const shortUrl = await ulvisResponse.text();

    return NextResponse.json({ shortUrl }, { status: 200 });
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
