'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setMsg(res.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          placeholder="Email"
        />
        <input
          type="password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </main>
  );
}
