import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { donationPresets, site } from "@/content/site";
import { Heart, ShieldCheck, Repeat, Receipt } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Hope House" },
      { name: "description", content: "Give a child a meal, a school day, or a safe night. Every gift is logged and reported in our quarterly summary." },
      { property: "og:title", content: "Donate — Hope House" },
      { property: "og:description", content: "Every gift is logged and reported in our quarterly summary." },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const [selected, setSelected] = useState<number>(60);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const amount = custom ? Number(custom) || 0 : selected;

  const handleGive = () => {
    // Stripe checkout will be wired in once payments are enabled.
    alert(
      `Thank you! In a moment we'll connect Stripe to process your ${frequency} gift of $${amount}. (Payments setup pending.)`,
    );
  };

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 pb-20 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Give</span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight">
            Pick an amount. <span className="crayon-underline">Change a week.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Each gift goes straight to the kids. We log it, categorise it, and report back to you in our next quarterly summary.
          </p>

          {/* Frequency */}
          <div className="mt-8 inline-flex rounded-full bg-secondary p-1">
            {(["one-time", "monthly"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  frequency === f ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                }`}
              >
                {f === "one-time" ? "One-time" : "Monthly"}
              </button>
            ))}
          </div>

          {/* Presets */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {donationPresets.map((p) => {
              const active = !custom && selected === p.amount;
              return (
                <button
                  key={p.amount}
                  onClick={() => { setSelected(p.amount); setCustom(""); }}
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-soft -translate-y-0.5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-2xl font-semibold">${p.amount}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.label}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                </button>
              );
            })}
          </div>

          {/* Custom */}
          <div className="mt-5">
            <label className="text-sm font-semibold text-foreground/80">Or enter a custom amount</label>
            <div className="mt-2 flex items-center gap-2 max-w-xs">
              <span className="font-display text-xl text-muted-foreground">$</span>
              <Input
                type="number"
                min={1}
                placeholder="100"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="rounded-full"
              />
            </div>
          </div>

          <Button
            size="lg"
            className="mt-8 rounded-full font-semibold shadow-pop w-full sm:w-auto"
            disabled={amount <= 0}
            onClick={handleGive}
          >
            <Heart className="h-5 w-5" />
            Give ${amount || 0}
            {frequency === "monthly" && " / month"}
          </Button>

          <p className="mt-4 text-xs text-muted-foreground max-w-md">
            Secure card payments powered by Stripe. You'll receive an email receipt and your gift will appear in our next quarterly accountability report.
          </p>
        </div>

        {/* Side promise card */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-[2rem] bg-card border border-border p-7 shadow-soft">
            <h2 className="font-display text-xl font-semibold">Our promise to you</h2>
            <ul className="mt-5 space-y-4">
              <PromiseRow icon={<ShieldCheck className="h-5 w-5" />} title="Open books" body="Every quarter, we publish exactly what came in and where it went." />
              <PromiseRow icon={<Receipt className="h-5 w-5" />} title="Receipt by email" body="You'll get an instant receipt for your records." />
              <PromiseRow icon={<Repeat className="h-5 w-5" />} title="Cancel anytime" body="Monthly gifts can be paused or stopped from the email receipt." />
            </ul>
          </div>

          <div className="mt-5 rounded-2xl bg-secondary/60 p-5 text-sm">
            <p className="font-semibold">Prefer a bank transfer?</p>
            <p className="mt-1 text-muted-foreground">Email <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we'll send our account details right back.</p>
          </div>
        </aside>
      </section>
    </Layout>
  );
}

function PromiseRow({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <li className="flex gap-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{body}</div>
      </div>
    </li>
  );
}
