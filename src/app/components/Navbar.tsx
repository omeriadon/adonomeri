"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: "bi bi-house" },
    { href: "/projects", label: "Projects", icon: "bi bi-code-square" },
    { href: "/skills", label: "Skills", icon: "bi bi-tools" },
    { href: "/journey", label: "Journey", icon: "bi bi-clock-history" },
    { href: "/blog", label: "Blog", icon: "bi bi-journal-text" },
    { href: "/contact", label: "Contact", icon: "bi bi-envelope" }
  ];

  return (
    <nav className="fixed w-full bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-400">
            Adon Omeri
          </Link>

          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  pathname === link.href
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                }`}
              >
                <i className={link.icon}></i>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}