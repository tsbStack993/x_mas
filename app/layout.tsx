import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'sass',
  description: 'testing testing 123',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#0f172a', color: '#e2e8f0' }}>
        <div style={{ maxWidth: 720, margin: '40px auto', padding: 24 }}>
          <nav style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <Link href="/" style={{ color: '#93c5fd' }}>Home</Link>
            <Link href="/dashboard" style={{ color: '#93c5fd' }}>Dashboard</Link>
            <Link href="/login" style={{ color: '#93c5fd' }}>Login</Link>
            <Link href="/register" style={{ color: '#93c5fd' }}>Register</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
