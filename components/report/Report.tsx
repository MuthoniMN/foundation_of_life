import { FileText } from "lucide-react";

type ReportCategory = {
  label: string;
  amount: number;
  color: string;
};

export type ReportData = {
  id?: number | string;
  period: string;
  totalReceived: number;
  totalSpent: number;
  notes: string;
  reportUrl?: string | null;
  categories: ReportCategory[];
};

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function normalizeReport(raw: any): ReportData {
  const rawCategories = Array.isArray(raw?.categories) ? raw.categories : [];

  const categories = rawCategories
    .map((entry: any) => {
      // Supports both legacy array shape and newer blocks shape.
      if (entry?.label && typeof entry?.amount === "number") {
        return {
          label: entry.label,
          amount: entry.amount,
          color: entry.color || "var(--muted-foreground)",
        };
      }

      const relation = entry?.category;
      const label =
        typeof relation === "object" && relation?.name
          ? relation.name
          : typeof relation === "string"
            ? relation
            : "Uncategorized";

      return {
        label,
        amount: typeof entry?.amount === "number" ? entry.amount : 0,
        color:
          typeof relation === "object" && relation?.color
            ? relation.color
            : "var(--muted-foreground)",
      };
    })
    .filter((entry: ReportCategory) => entry.amount > 0);

  const reportFile = raw?.reportFile;
  const reportUrl =
    typeof reportFile === "object"
      ? reportFile?.cloudinary?.secure_url || reportFile?.url || null
      : null;

  return {
    id: raw?.id,
    period: raw?.period || "Report",
    totalReceived: typeof raw?.totalReceived === "number" ? raw.totalReceived : 0,
    totalSpent: typeof raw?.totalSpent === "number" ? raw.totalSpent : 0,
    notes: raw?.notes || "",
    reportUrl,
    categories,
  };
}

export function Report({ report, latest = false }: { report: ReportData; latest?: boolean }) {
  const total = report.categories.reduce((sum, c) => sum + c.amount, 0);

  return (
    <article className="rounded-[2rem] bg-card border border-border p-6 sm:p-8 shadow-soft">
      <header className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">{report.period}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Received <span className="font-semibold text-foreground">{fmt(report.totalReceived)}</span> · Spent{" "}
            <span className="font-semibold text-foreground">{fmt(report.totalSpent)}</span>
          </p>
        </div>
        {latest && (
          <span className="rounded-full bg-mint/40 px-3 py-1 text-xs font-semibold text-foreground">
            Most recent
          </span>
        )}
      </header>

      {report.categories.length > 0 && (
        <div className="mt-6">
          <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
            {report.categories.map((c) => (
              <div
                key={`${report.period}-${c.label}`}
                style={{ width: `${total > 0 ? (c.amount / total) * 100 : 0}%`, backgroundColor: c.color }}
                title={`${c.label}: ${fmt(c.amount)}`}
              />
            ))}
          </div>
          <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {report.categories.map((c) => (
              <li key={`${report.period}-${c.label}-legend`} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-foreground/90">{c.label}</span>
                </span>
                <span className="font-semibold tabular-nums">{fmt(c.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {report.notes && (
        <div className="mt-6 rounded-2xl bg-secondary/60 p-4 text-sm text-foreground/90 leading-relaxed">
          <span className="font-semibold">Notes: </span>
          {report.notes}
        </div>
      )}

      {report.reportUrl && (
        <a href={report.reportUrl} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <FileText className="h-4 w-4" /> Download full PDF
        </a>
      )}
    </article>
  );
}
