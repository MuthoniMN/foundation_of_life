import type { Metadata } from "next";
import { Layout } from "@/components/site/Layout";
import { ShieldCheck, Repeat, Receipt } from "lucide-react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { DonateForm } from "./DonateForm";

export const metadata: Metadata = {
    title: "Donate — Chariots of Destiny Children's Center",
    description: "Give a child a meal, a school day, or a safe night. Every contribution is logged and reported in our quarterly summary.",
    openGraph: {
        title: "Donate — Chariots of Destiny Children's Center",
        description: "Every contribution is logged and reported in our quarterly summary.",
    },
};

export default async function DonatePage() {
    const payload = await getPayload({ config });
    const { docs: donationPresets } = await payload.find({
        collection: "donation-presets",
    });

    return (
        <Layout>
            <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 pb-20 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
                <div>
                    <DonateForm donationPresets={donationPresets} />
                </div>

                <aside className="lg:sticky lg:top-24 self-start">
                    <div className="rounded-[2rem] bg-card border border-border p-7 shadow-soft">
                        <h2 className="font-display text-xl font-semibold">Our promise to you</h2>
                        <ul className="mt-5 space-y-4">
                            <li className="flex gap-3">
                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></span>
                                <div>
                                    <div className="text-sm font-semibold">Open books</div>
                                    <div className="text-sm text-muted-foreground">Every quarter, we publish exactly what came in and where it went.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Receipt className="h-5 w-5" /></span>
                                <div>
                                    <div className="text-sm font-semibold">Receipt by email</div>
                                    <div className="text-sm text-muted-foreground">You'll get an instant receipt for your records.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Repeat className="h-5 w-5" /></span>
                                <div>
                                    <div className="text-sm font-semibold">Cancel anytime</div>
                                    <div className="text-sm text-muted-foreground">Monthly contributions can be paused or stopped from the email receipt.</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>
            </section>
        </Layout>
    );
}
