import { requireRole } from "@/lib/auth";

export default async function StartupLayout({ children }: any) {
  await requireRole("startup");

  return <main>
    <nav>
      <form action="/api/auth/signout" method="POST">
            <button type="submit">Logout</button>
          </form>
    </nav>
    {children}
    </main>;
}
