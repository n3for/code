import type { Metadata } from "next";
import Link from "next/link";
=======

export const metadata: Metadata = {
  title: "K+ CRM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <nav className="max-w-4xl mx-auto p-4 flex gap-4 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/orders" className="hover:underline">
              Orders
            </Link>
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>
          </nav>
        </header>
        <div className="max-w-4xl mx-auto">{children}</div>
      </body>
=======
      <body>{children}</body>
    </html>
  );
}
