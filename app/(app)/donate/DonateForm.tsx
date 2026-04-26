"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, CheckCircle2 } from "lucide-react";
import { DonationPreset } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface DonateFormProps {
    donationPresets: DonationPreset[];
}

export function DonateForm({ donationPresets }: DonateFormProps) {
    const [selected, setSelected] = useState<DonationPreset | null>(null);
    const [custom, setCustom] = useState("");
    const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
    const amount = custom ? Number(custom) || 0 : selected?.amount || 0;
    const selectionLabel = custom ? "Custom gift" : selected?.label ?? "Choose an amount";

    const handleGive = (link: string) => {
        window.location.href = link;
    };

    return (
        <div className="rounded-[2rem] border border-border bg-white p-8 shadow-lg">
            <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Give</span>
                <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold leading-tight text-foreground">
                    Support children with a donation that fits your budget.
                </h1>
                <p className="mt-5 text-lg text-foreground/60 max-w-xl">
                    Your contribution helps provide meals, education, and shelter. We log every gift and share quarterly reports so you can see the impact.
                </p>
            </div>

            <div className="mt-10">
                <div className="space-y-6">
                    <div className="rounded-[1.75rem] border border-border bg-white p-6">
                        <div className="inline-flex overflow-hidden rounded-full bg-white border border-border p-1">
                            {(["one-time", "monthly"] as const).map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setFrequency(option)}
                                    aria-pressed={frequency === option}
                                    className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${frequency === option
                                            ? "bg-primary text-white shadow-md"
                                            : "text-foreground/60 hover:text-foreground"
                                        }`}
                                >
                                    {option === "one-time" ? "One-time" : "Monthly"}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            {donationPresets.map((preset) => {
                                const active = !custom && selected?.label === preset.label;
                                return (
                                    <button
                                        key={preset.label}
                                        type="button"
                                        onClick={() => {
                                            setSelected(preset);
                                            setCustom("");
                                        }}
                                        className={`group rounded-3xl border-2 p-5 text-left transition-all duration-300 transform ${active
                                                ? "border-primary bg-orange-50 shadow-md"
                                                : "border-border bg-white hover:border-primary hover:shadow-md"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className={`font-display text-3xl font-bold ${active ? "text-primary" : "text-foreground"}`}>
                                                    ${preset.amount}
                                                </p>
                                                <p className="mt-1 text-sm uppercase tracking-widest font-semibold text-foreground/50">{preset.label}</p>
                                            </div>
                                            <span
                                                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${active
                                                        ? "bg-primary text-white"
                                                        : "bg-orange-100 text-primary group-hover:bg-primary group-hover:text-white"
                                                    }`}
                                            >
                                                {active ? (
                                                    <span className="flex items-center gap-1">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        Selected
                                                    </span>
                                                ) : (
                                                    "Select"
                                                )}
                                            </span>
                                        </div>
                                        <div className="mt-4 text-sm leading-6 text-foreground/60 line-clamp-2 group-hover:text-foreground/70 transition-colors">
                                            <RichText data={preset.description} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 rounded-3xl border border-border bg-white p-5">
                            <label className="text-sm font-bold text-foreground">Or enter a custom amount</label>
                            <div className="mt-3 flex items-center gap-3 max-w-xs">
                                <span className="font-display text-xl font-bold text-primary">$</span>
                                <Input
                                    type="number"
                                    min={1}
                                    step={1}
                                    placeholder="100"
                                    value={custom}
                                    onChange={(event) => setCustom(event.target.value)}
                                    className="rounded-full border border-border focus:border-primary focus:ring-2 focus:ring-orange-200 bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-border bg-orange-50 p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-primary">Donation summary</p>
                                <p className="mt-3 text-xl font-bold text-foreground">{selectionLabel}</p>
                                <p className="mt-2 text-sm font-semibold text-foreground/60">
                                    {frequency === "monthly" ? "Recurring monthly support" : "One-time gift"}
                                </p>
                            </div>
                            <div className="rounded-full bg-primary px-5 py-3 text-lg font-bold text-white shadow-md">
                                ${amount || 0}
                                {frequency === "monthly" ? "/mo" : ""}
                            </div>
                        </div>
                        <div className="mt-5 space-y-3 text-sm font-medium text-foreground/60">
                            <p>Your gift helps plan meals, classes, and safe nights for children in need.</p>
                            <p>We share quarterly accountability reports so you can follow the impact.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                size="lg"
                className="mt-10 w-full rounded-full font-bold shadow-lg bg-primary hover:bg-primary/90 text-white border-0 transition-all duration-300"
                disabled={amount <= 0}
                onClick={() => handleGive(
                    selected?.stripePaymentLink && frequency === "monthly"
                        ? selected?.stripePaymentLink
                        : "https://buy.stripe.com/test_fZucN58551jB3G83N41sQ04"
                )}
            >
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Give ${amount || 0}
                {frequency === "monthly" && " / month"}
            </Button>

            <p className="mt-4 text-sm font-medium text-foreground/50 max-w-2xl">
                All payments are secure and transparent. Once you give, we'll send a receipt and include your gift in our next quarterly accountability report.
            </p>
        </div>
    );
}

