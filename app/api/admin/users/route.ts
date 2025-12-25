// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    where: { NOT: { role: "admin" } },
    select: { id: true, email: true, name: true, role: true },
    orderBy: { role: "asc" },
  });

  return NextResponse.json({ users }, { status: 200 });
}
