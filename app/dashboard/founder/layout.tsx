import { requireRole } from "@/lib/auth";

export default async function FounderLayout({ children }: any) {
  await requireRole("founder");

  return <main>
    <nav>
      <form action="/api/auth/signout" method="POST">
            <button type="submit">Logout</button>
          </form>
    </nav>
    {children}
    </main>;
}
