import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardRouter() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  switch (session.user.role) {
    case "admin":
      redirect("/dashboard/admin");
    case "founder":
      redirect("/dashboard/founder");
    case "startup":
      redirect("/dashboard/startup");
    default:
      redirect("/dashboard/member");
  }
}
