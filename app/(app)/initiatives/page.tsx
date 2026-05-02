import type { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { getPayload } from "payload";
import config from "@/payload.config";

export const metadata: Metadata = {
    title: "Projects — Chariots of Destiny Children's Center",
    description: "Support a specific project at Chariots of Destiny Children's Center and help us fund it transparently.",
    openGraph: {
        title: "Projects — Chariots of Destiny Children's Center",
        description: "Support a specific project at Chariots of Destiny Children's Center and help us fund it transparently.",
    },
};

const PROJECT_STRIPE_LINK = "https://buy.stripe.com/test_fZucN58551jB3G83N41sQ04";

function toSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function buildProjectCheckoutLink(projectId: number, projectTitle: string, amount: number) {
    const slug = toSlug(projectTitle);
    const clientRef = `project:${projectId}:${slug}|amount:${amount}`;
    const url = new URL(PROJECT_STRIPE_LINK);
    url.searchParams.set("amount", String(amount));
    url.searchParams.set("projectId", String(projectId));
    url.searchParams.set("project", slug);
    url.searchParams.set("client_reference_id", clientRef);
    return url.toString();
}

export default async function ProgramsPage() {
    const payload = await getPayload({ config });
    const { docs: projects } = await payload.find({
        collection: "projects",
        depth: 1,
        sort: "-createdAt",
        limit: 100,
    });

    return (
        <Layout>
            <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-14">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Projects</span>
                <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight">
                    Fund a specific project.
                </h1>
                <p className="mt-5 text-lg text-muted-foreground">
                    Choose a project and give directly toward it. We track each contribution and publish progress in our accountability reports.
                </p>
            </section>

            <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 grid gap-5">
                {projects.map((project: any) => {
                    const amount = Math.max(1, Number(project.estimatedBudget || 50));
                    const checkoutLink = buildProjectCheckoutLink(project.id, project.title, amount);

                    return (
                        <article key={project.id} className="rounded-3xl bg-card border border-border p-7 shadow-soft">
                            <h2 className="font-display text-2xl font-semibold">{project.title}</h2>
                            <p className="mt-2 text-muted-foreground leading-relaxed">
                                {project.goalDescription || "Support this project and help us complete it for the children."}
                            </p>
                            <p className="mt-4 text-sm text-foreground/80">
                                Suggested gift: <span className="font-semibold">${amount.toLocaleString("en-US")}</span>
                            </p>
                            <Button asChild size="lg" className="mt-6 rounded-full font-semibold shadow-pop">
                                <Link href={checkoutLink}>
                                    <Heart className="h-5 w-5" /> Donate to this project
                                </Link>
                            </Button>
                        </article>
                    );
                })}
            </section>
        </Layout>
    );
}
