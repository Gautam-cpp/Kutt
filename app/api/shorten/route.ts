import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from '@/app/lib/auth';
import { cookies } from "next/headers";



export async function POST(req: Request) {
  try {
  
    const cookieStore =await cookies();
    const token = cookieStore.get("login token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

   

    const decoded = verifyToken(token.value);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // @ts-ignore
    const { id } = decoded;

    const { longUrl, shortUrl } = await req.json();


    const shortenedUrl = await prisma.shortenedUrl.create({
      data: {
        longUrl,
        shortUrl,
        userId: id,
      },
    });


    return NextResponse.json({ shortenedUrl });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save shortened URL" }, { status: 500 });
  }
}
