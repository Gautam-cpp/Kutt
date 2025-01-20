import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import * as bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import validator from "email-validator"
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

  const isValid = validator.validate(email);
    if (!isValid) {
      return new Response(JSON.stringify({ message: "Invalid email." }), {status: 401})
    }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(JSON.stringify({ message: "Invalid email or password." }), {status: 401})
    }

    const token = await jwt.sign({id:user.id}, process.env.JWT_SECRET, { expiresIn: '1h' })
    const id = user.id;
    const response = NextResponse.json({
      message: "Login successful",
      user: { id, email: user.email },
      
    });
    
    
    response.cookies.set("login token", token);

    return response;

  } catch (error) {
    // @ts-ignore
    console.error("Login error:", error.message || error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
