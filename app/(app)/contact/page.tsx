import type { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/site/Layout";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPayload } from "payload";
import config from "@/payload.config";

export const metadata: Metadata = {
    title: "Contact — Chariots of Destiny Children's Center",
    description: "Visit, write, call, or partner with Chariots of Destiny Children's Center. We'd love to hear from you.",
    openGraph: {
        title: "Contact — Chariots of Destiny Children's Center",
        description: "Visit, write, call, or partner with Chariots of Destiny Children's Center.",
    },
};

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
    const inner = (
        <div className="rounded-3xl bg-card border border-border p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift h-full">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-1 text-base font-medium text-foreground">{value}</div>
        </div>
    );
    return href ? <a href={href}>{inner}</a> : inner;
}

export default async function ContactPage() {
    const payload = await getPayload({ config });
    const site = await payload.findGlobal({ slug: "site-settings" });

    return (
        <Layout>
            <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-14">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Get in touch</span>
                <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight">
                    We'd love to hear from you.
                </h1>
                <p className="mt-5 text-lg text-muted-foreground">
                    Donors, churches, volunteers, journalists — whoever you are, the kettle is on.
                </p>
            </section>

            <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 grid gap-6 sm:grid-cols-3">
                <ContactCard icon={<Mail className="h-5 w-5" />} label="Email" value={site.contact.email} href={`mailto:${site.contact.email}`} />
                {site.contact && site.contact?.phone && site.contact.phone?.length > 0 && (
                    site.contact.phone?.map((p, i) => (
                        <ContactCard key={i} icon={<Phone className="h-5 w-5" />} label="Phone" value={p.phoneNumber} href={`tel:${p.phoneNumber.replace(/\s+/g, "")}`} />
                    ))
                )}
                <ContactCard icon={<MapPin className="h-5 w-5" />} label="Visit" value={site.contact.address} />
            </section>

            <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
                <div className="rounded-[2rem] bg-secondary p-8 sm:p-12 text-center shadow-soft">
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold">Looking for the easiest way to help?</h2>
                    <p className="mt-2 text-muted-foreground">A one-time gift gets to the kids this week.</p>
                    <Button asChild size="lg" className="mt-6 rounded-full shadow-pop font-semibold">
                        <Link href="/donate"><Heart className="h-5 w-5" /> Donate now</Link>
                    </Button>
                </div>
            </section>
        </Layout>
    );
}
