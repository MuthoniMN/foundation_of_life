import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg shadow-pop">
              H
            </span>
            <span className="font-display text-xl font-semibold">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            A church-founded home and school where every child belongs.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold">Visit</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />{site.contact.address}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" />{site.contact.email}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" />{site.contact.phone}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Our story</Link></li>
            <li><Link to="/programs" className="text-muted-foreground hover:text-foreground">Programs</Link></li>
            <li><Link to="/accountability" className="text-muted-foreground hover:text-foreground">Accountability</Link></li>
            <li><Link to="/donate" className="text-muted-foreground hover:text-foreground">Donate</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {site.name}. Made with love.</p>
          <p>Registered children's home & school.</p>
        </div>
      </div>
    </footer>
  );
}
