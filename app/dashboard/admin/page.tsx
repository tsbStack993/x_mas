// app/admin/page.tsx
'use client';

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  // Fetch non-admin users
  async function loadUsers() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function promote(email: string) {
    setMsg("");
    const res = await fetch("/api/admin/promote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) setMsg(data.error || "Promotion failed");
    else {
      setMsg(`${email} promoted to admin`);
      loadUsers();
    }
  }

  async function demote(email: string) {
    setMsg("");
    const res = await fetch("/api/admin/demote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) setMsg(data.error || "Demotion failed");
    else {
      setMsg(`${email} demoted to member`);
      loadUsers();
    }
  }

  return (
    <main>
      <h1>Admin Dashboard</h1>
      {msg && <p>{msg}</p>}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.name || "-"}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => promote(u.email)}>Promote</button>
                <button onClick={() => demote(u.email)}>Demote</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
