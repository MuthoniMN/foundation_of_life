import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { fundReports, type FundReport } from "@/content/site";
import { Heart, FileText } from "lucide-react";

export const Route = createFileRoute("/accountability")({
  head: () => ({
    meta: [
      { title: "Accountability — Where every gift goes | Hope House" },
      { name: "description", content: "Quarterly summary reports of every dollar received and spent at Hope House. Open books, no surprises." },
      { property: "og:title", content: "Accountability — Where every gift goes" },
      { property: "og:description", content: "Quarterly summary reports of every dollar received and spent at Hope House." },
    ],
  }),
  component: AccountabilityPage,
});

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function AccountabilityPage() {
  const latest = fundReports[0];
  const totalReceivedYear = fundReports.reduce((s, r) => s + r.totalReceived, 0);
  const totalSpentYear = fundReports.reduce((s, r) => s + r.totalSpent, 0);

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Accountability</span>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight">
          Where every gift goes.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          We publish a plain summary every quarter — what came in, what went out, and what changed for the kids because of it. If anything is unclear, just write to us.
        </p>
      </section>

      {/* YEAR SUMMARY */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Received this year" value={fmt(totalReceivedYear)} accent="bg-mint/30" />
          <SummaryCard label="Spent this year" value={fmt(totalSpentYear)} accent="bg-sun/30" />
          <SummaryCard label="Reports published" value={`${fundReports.length}`} accent="bg-sky/30" />
        </div>
      </section>

      {/* REPORTS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
        {fundReports.map((report, idx) => (
          <ReportCard key={report.period} report={report} latest={idx === 0 && report === latest} />
        ))}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-[2rem] bg-secondary p-8 sm:p-12 text-center shadow-soft">
          <h2 className="font-display text-3xl font-semibold">Be part of the next report.</h2>
          <p className="mt-3 text-muted-foreground">
            Your gift will appear, by category, in our next quarterly summary.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full shadow-pop font-semibold">
            <Link to="/donate"><Heart className="h-5 w-5" /> Donate now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 shadow-soft">
      <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${accent} blur-2xl`} aria-hidden />
      <div className="relative">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-2 font-display text-3xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

function ReportCard({ report, latest }: { report: FundReport; latest?: boolean }) {
  const total = report.categories.reduce((s, c) => s + c.amount, 0);

  return (
    <article className="rounded-[2rem] bg-card border border-border p-6 sm:p-8 shadow-soft">
      <header className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">{report.period}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Received <span className="font-semibold text-foreground">{fmt(report.totalReceived)}</span> · Spent <span className="font-semibold text-foreground">{fmt(report.totalSpent)}</span>
          </p>
        </div>
        {latest && (
          <span className="rounded-full bg-mint/40 px-3 py-1 text-xs font-semibold text-foreground">
            Most recent
          </span>
        )}
      </header>

      {/* Stacked bar */}
      <div className="mt-6">
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
          {report.categories.map((c) => (
            <div
              key={c.label}
              style={{ width: `${(c.amount / total) * 100}%`, backgroundColor: c.color }}
              title={`${c.label}: ${fmt(c.amount)}`}
            />
          ))}
        </div>
        <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {report.categories.map((c) => (
            <li key={c.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-foreground/90">{c.label}</span>
              </span>
              <span className="font-semibold tabular-nums">{fmt(c.amount)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl bg-secondary/60 p-4 text-sm text-foreground/90 leading-relaxed">
        <span className="font-semibold">Notes: </span>{report.notes}
      </div>

      {report.reportUrl && (
        <a
          href={report.reportUrl}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <FileText className="h-4 w-4" /> Download full PDF
        </a>
      )}
    </article>
  );
}

