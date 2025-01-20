// import { NextApiRequest, NextApiResponse } from "next";

import * as bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');

export async function POST(req: Request, res: Response) {

  const { email, password } =await req.json();


  if (!email || !password) {
    return new Response(
      JSON.stringify(
        { 
          message: "Email and password are required." 
        }),
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists." }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = await jwt.sign({id: newUser.id}, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({
      message: "Sign Up successful",
      user: { id: newUser.id, email: newUser.email },
    });
    
    response.cookies.set("login token", token);
    

    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Signup error:", errorMessage);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}


