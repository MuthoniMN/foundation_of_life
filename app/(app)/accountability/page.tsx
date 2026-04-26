import type { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Report, normalizeReport } from "@/components/report/Report";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export const metadata: Metadata = {
    title: "Accountability — Where every gift goes | Chariots of Destiny Children's Center",
    description: "Quarterly summary reports of every dollar received and spent at Chariots of Destiny Children's Center. Open books, no surprises.",
    openGraph: {
        title: "Accountability — Where every gift goes",
        description: "Quarterly summary reports of every dollar received and spent at Chariots of Destiny Children's Center. Open books, no surprises.",
    },
};

const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

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

export default async function AccountabilityPage({
    searchParams,
}: {
    searchParams?: Promise<{ page?: string }>;
}) {
    const params = (await searchParams) || {};
    const currentPage = Math.max(1, Number(params.page || "1") || 1);
    const payload = await getPayload({ config });

    const [reportsResult, totalsResult] = await Promise.all([
        payload.find({
            collection: "reports",
            depth: 2,
            limit: 5,
            page: currentPage,
            sort: "-createdAt",
        }),
        payload.find({
            collection: "reports",
            depth: 0,
            limit: 1000,
            page: 1,
            sort: "-createdAt",
        }),
    ]);

    const reports = reportsResult.docs.map((doc) => normalizeReport(doc));
    const latestId = totalsResult.docs[0]?.id;
    const totalReceivedYear = totalsResult.docs.reduce((sum: number, r: any) => sum + (r.totalReceived || 0), 0);
    const totalSpentYear = totalsResult.docs.reduce((sum: number, r: any) => sum + (r.totalSpent || 0), 0);

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
                    <SummaryCard label="Reports published" value={`${totalsResult.totalDocs}`} accent="bg-sky/30" />
                </div>
            </section>

            {/* REPORTS */}
            <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
                {reports.map((report) => (
                    <Report key={report.id || report.period} report={report} latest={report.id === latestId} />
                ))}

                {reportsResult.totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={
                                        currentPage > 1
                                            ? `/accountability?page=${currentPage - 1}`
                                            : "#"
                                    }
                                    aria-disabled={currentPage <= 1}
                                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {Array.from({ length: reportsResult.totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                <PaginationItem key={`page-${pageNumber}`}>
                                    <PaginationLink
                                        href={`/accountability?page=${pageNumber}`}
                                        isActive={pageNumber === currentPage}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href={
                                        currentPage < reportsResult.totalPages
                                            ? `/accountability?page=${currentPage + 1}`
                                            : "#"
                                    }
                                    aria-disabled={currentPage >= reportsResult.totalPages}
                                    className={currentPage >= reportsResult.totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24">
                <div className="rounded-[2rem] bg-secondary p-8 sm:p-12 text-center shadow-soft">
                    <h2 className="font-display text-3xl font-semibold">Be part of the next report.</h2>
                    <p className="mt-3 text-muted-foreground">
                        Your gift will appear, by category, in our next quarterly summary.
                    </p>
                    <Button asChild size="lg" className="mt-6 rounded-full shadow-pop font-semibold">
                        <Link href="/donate"><Heart className="h-5 w-5" /> Donate now</Link>
                    </Button>
                </div>
            </section>
        </Layout>
    );
}
