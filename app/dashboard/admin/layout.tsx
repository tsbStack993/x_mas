import { requireRole } from "@/lib/auth";

export default async function AdminLayout({ children }: any) {
  await requireRole("admin");

  return <main>
    <nav>
      <form action="/api/auth/signout" method="POST">
            <button type="submit">Logout</button>
          </form>
    </nav>
    {children}
    </main>;
}
