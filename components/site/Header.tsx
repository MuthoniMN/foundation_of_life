"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/initiatives", label: "Projects" },
  { href: "/accountability", label: "Accountability" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [siteName, setSiteName] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    fetch("/api/site-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!mounted || !data?.site?.name) return;
        setSiteName(data.site.name);
      })
      .catch(() => { });
    return () => { mounted = false; };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-primary border-b border-primary-dark shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white font-serif text-base transition-all group-hover:bg-white/20">
            ✝
          </span>
          <span className="font-serif text-lg font-bold text-white tracking-tight leading-none">
            {siteName || "Children's Home"}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-sm
                ${isActive(l.href)
                  ? "text-white after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-accent after:rounded-full"
                  : "text-white/65 hover:text-white hover:bg-white/8"
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Donate CTA */}
        <div className="hidden md:block">
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-sm bg-accent text-white text-sm font-semibold tracking-wide hover:bg-accent-hover transition-colors duration-200"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            Donate
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-sm text-white/80 hover:text-white hover:bg-white/10 transition-all"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-primary-dark">
          <div className="px-4 py-4 flex flex-col gap-0.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-sm transition-colors
                  ${isActive(l.href)
                    ? "bg-white/10 text-white border-l-2 border-accent"
                    : "text-white/70 hover:text-white hover:bg-white/8"
                  }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors"
            >
              <Heart className="h-4 w-4 fill-current" />
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}