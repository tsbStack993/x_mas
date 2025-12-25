// app/api/admin/demote/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // Only allow logged-in admins
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.id === Number(session.user.id)) {
    return NextResponse.json({ error: "You cannot demote yourself" }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { email },
    data: { role: "member" }, // default role after demotion
    select: { id: true, email: true, role: true },
  });

  return NextResponse.json({ user: updated }, { status: 200 });
}
