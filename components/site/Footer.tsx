import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function Footer() {
  const payload = await getPayload({ config });
  const site = await payload.findGlobal({ slug: "site-settings" });

  const hasLocation = Boolean(site.contact.location);

  return (
    <footer className="mt-24 border-t border-border">

      {/* Main footer body — dark green */}
      <div className="bg-primary-foreground">
        <div
          className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12
            ${hasLocation
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
            }`}
        >
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-white/15 text-black font-serif text-lg">
                ✝
              </span>
              <span className="font-serif text-lg font-bold text-black leading-tight">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-black/60 max-w-xs leading-relaxed">
              {site.tagline}
            </p>
            <p className="mt-6 text-xs text-black/35 font-medium uppercase tracking-widest">
              Registered children's home & school
            </p>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
              Visit us
            </h3>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex gap-3 items-start">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>{site.contact.address}</span>
              </li>
              <li className="flex gap-3 items-start">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-white transition-colors flex gap-3 items-center"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  {site.contact.email}
                </a>
              </li>
              {site.contact.phone?.map((p, i) => (
                <li key={i} className="flex gap-3 items-start flex">
                  <a
                    href={`tel:${p.phoneNumber}`}
                    className="hover:text-white transition-colors flex gap-3 items-center"
                  >
                    <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                    {p.phoneNumber}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/about", label: "Our story" },
                { href: "/initiatives", label: "Initiatives" },
                { href: "/accountability", label: "Accountability" },
                { href: "/contact", label: "Contact us" },
                { href: "/donate", label: "Make a donation" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-black hover:text-secondary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map column */}
          {hasLocation && (
            <div>
              <h3 className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
                Location
              </h3>
              <div className="overflow-hidden rounded-lg border border-white/15 h-40">
                <iframe
                  src={site.contact.location ?? undefined}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="bg-primary border-t border-white/10" >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white/80">{site.name}</span>.
              All rights reserved.
            </p>
            <p className="font-medium text-white/40 italic font-serif">
              "Caring for the least of these."
            </p>
          </div>
        </div >
      </div>
    </footer >
  );
}