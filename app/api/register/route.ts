import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password, name, role } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const allowedRoles = ["member", "startup", "founder"]; 
  const safeRole = allowedRoles.includes(role) ? role : "member";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, passwordHash: hash ,role: safeRole},
    select: { id: true, email: true, name: true ,role: true},
  });

  return NextResponse.json({ user }, { status: 201 });
}
