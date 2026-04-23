import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/accountability", label: "Accountability" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg shadow-pop transition-transform group-hover:rotate-[-6deg]">
            H
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 rounded-full text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-secondary transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-full text-sm font-semibold text-foreground bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-full font-semibold shadow-pop">
            <Link to="/donate">
              <Heart className="h-4 w-4" /> Donate
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "px-3 py-2 rounded-lg text-sm font-semibold text-foreground bg-secondary" }}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="rounded-full mt-2 w-full">
              <Link to="/donate" onClick={() => setOpen(false)}>
                <Heart className="h-4 w-4" /> Donate
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
