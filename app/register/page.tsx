'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'member' });
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (res.ok) {
      setMessage('Account created. You can now log in.');
    } else {
      setMessage(data.error || 'Error');
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <input placeholder="Name" value={form.name} onChange={(e)=>setForm(f=>({...f, name:e.target.value}))} />
        <input placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm(f=>({...f, email:e.target.value}))} required />
        <input placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm(f=>({...f, password:e.target.value}))} required />
        <select value={form.role} onChange={(e)=>setForm(f=>({...f, role:e.target.value}))}>
          <option value="member">Member</option>
          <option value="startup">Startup</option>
          <option value="founder">Founder</option>
        </select>
        <button type="submit">Create account</button>
      </form>
      {message && <p style={{ marginTop: 8 }}>{message}</p>}
      <p>Check server console for verification link.</p>
    </div>
  );
}
