import type { Metadata } from "next";
import Image from "next/image";
import { Layout } from "@/components/site/Layout";
import { getPayload } from "payload";
import config from "@/payload.config";
import RichText from "@/components/RichText";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import heroImg from "@/public/assets/hero-children.jpg";
import type { ContentBlock } from "@/payload-types";
import { extractFirstText } from "../page";

export async function generateMetadata(): Promise<Metadata> {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
        collection: "pages",
        where: { slug: { equals: "about" } },
    });
    const page = docs[0];
    return {
        title: page?.meta?.title || "Our Story",
        description: page?.meta?.description || "Our story",
        openGraph: {
            title: page?.meta?.title || "Our Story",
            description: page?.meta?.description || "Our story",
        },
    };
}

const timelineEvents = [
    { year: "1998", title: "Founded", description: "The home opened its doors and began serving children in need." },
    { year: "2008", title: "Children's Home Built", description: "A dedicated residential space was completed to support the growing family." },
    { year: "2009", title: "First Girls Accommodated", description: "The home welcomed 12 girls into a safe and nurturing environment." },
    { year: "2019", title: "School Built", description: "A school was established on campus to provide stable education before the pandemic." },
    { year: "Today", title: "Caring for 19 Kids", description: "The home continues to support 19 children with love, safety, and education." },
];

export default async function AboutPage() {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
        collection: "pages",
        where: { slug: { equals: "about" } },
    });
    const page = docs[0];
    const contentBlocks =
        page?.layout?.filter((block): block is ContentBlock => block.blockType === "content") || [];
    const ctaBlocks = page?.layout?.filter((block) => block.blockType === "cta") || [];

    return (
        <Layout>
            {contentBlocks.map((section, idx) => {
                const textCol = section.columns?.[0];
                const imageCol = section.columns?.[1];
                const media = extractFirstMedia(imageCol?.richText);
                const reversed = idx % 2 === 1;
                const isHeroSection = idx === 0;
                const hasMedia = Boolean(media?.url);

                return (
                    <section
                        key={section.id || `${section.blockName || "section"}-${idx}`}
                        className={
                            isHeroSection
                                ? "relative overflow-hidden"
                                : idx % 2 === 1
                                    ? "bg-muted"
                                    : ""
                        }
                    >
                        {isHeroSection ? (
                            <>
                                {/* ── Full-bleed hero banner ── */}
                                <div className="relative min-h-[24rem] sm:min-h-[32rem]">
                                    <Image
                                        src={media?.url || heroImg.src}
                                        alt={media?.alt || "Chariots of Destiny Children's Center"}
                                        fill
                                        className="object-cover object-center"
                                        priority
                                    />
                                    {/* Dark overlay */}
                                    <div className="absolute inset-0 bg-black/50" aria-hidden />
                                    {/* Gold left border accent */}
                                    <div className="absolute inset-y-0 left-0 w-1.5 bg-accent" aria-hidden />
                                    <div className="relative z-10 flex min-h-[24rem] sm:min-h-[32rem] items-center py-20 px-4 sm:px-6 lg:px-8">
                                        <div className="mx-auto max-w-3xl [&_.payload-richtext_h1]:text-white [&_.payload-richtext_h2]:text-white [&_.payload-richtext_p]:text-white/80 [&_.payload-richtext_p]:text-lg [&_.payload-richtext_p]:mt-4 [&_.payload-richtext_p]:leading-relaxed">
                                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-muted-foreground leading-snug about-hero-h1">
                                                {extractFirstText(textCol?.richText)}
                                            </h2>
                                            <div className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed prose prose-muted">
                                                <RichText data={richTextWithoutTitle(textCol?.richText)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── TIMELINE ── */}
                                <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 gap-6">
                                    {/* Section header */}
                                    <div className="max-w-xl">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                                            Our story
                                        </p>
                                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-snug">
                                            Milestones that shaped the home
                                        </h2>
                                        <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                                            From the earliest founding to today, every milestone has helped build
                                            a stronger future for the children in our care.
                                        </p>
                                    </div>

                                    {/* Timeline */}
                                    <div className="relative">
                                        {/* Vertical rule — only on md+ */}
                                        <div
                                            className="hidden md:block absolute left-[7.5rem] top-0 bottom-0 w-px bg-border"
                                            aria-hidden
                                        />

                                        <ol className="space-y-0">
                                            {timelineEvents.map((event, idx) => {
                                                const isLast = idx === timelineEvents.length - 1;
                                                return (
                                                    <li key={event.year} className="relative flex gap-0 md:gap-0 group">

                                                        {/* Year column */}
                                                        <div className="hidden md:flex w-[7.5rem] shrink-0 pt-7 pr-8 justify-end">
                                                            <span
                                                                className={`font-serif text-sm font-bold tabular-nums leading-none
                        ${isLast ? "text-accent" : "text-muted-foreground"}`}
                                                            >
                                                                {event.year}
                                                            </span>
                                                        </div>

                                                        {/* Node on the line */}
                                                        <div className="hidden md:flex flex-col items-center shrink-0 w-0">
                                                            <div
                                                                className={`mt-6 h-4 w-4 rounded-full border-2 shrink-0 z-10 transition-colors
                        ${isLast
                                                                        ? "bg-accent border-accent"
                                                                        : "bg-white border-primary group-hover:bg-primary"
                                                                    }`}
                                                                style={{ marginLeft: "-0.5rem" }}
                                                            />
                                                            {!isLast && (
                                                                <div className="flex-1 w-px bg-transparent" />
                                                            )}
                                                        </div>

                                                        {/* Card */}
                                                        <div
                                                            className={`flex-1 ml-0 md:ml-10 mb-6 rounded-xl border bg-card p-6
                      transition-all duration-200
                      ${isLast
                                                                    ? "border-accent/40 bg-accent-light"
                                                                    : "border-border hover:border-primary/30 hover:shadow-sm"
                                                                }`}
                                                        >
                                                            {/* Mobile: year shown inline */}
                                                            <p
                                                                className={`md:hidden text-xs font-bold uppercase tracking-widest mb-2
                        ${isLast ? "text-accent" : "text-muted-foreground"}`}
                                                            >
                                                                {event.year}
                                                            </p>

                                                            <div className="flex items-start justify-between gap-4">
                                                                <div>
                                                                    <p className="font-serif text-base font-bold text-foreground">
                                                                        {event.title}
                                                                    </p>
                                                                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                                                                        {event.description}
                                                                    </p>
                                                                </div>
                                                                {isLast && (
                                                                    <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-sm bg-accent text-white text-xs font-semibold tracking-wide">
                                                                        Now
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ol>
                                    </div>
                                </section>
                            </>
                        ) : !hasMedia ? (
                            /* ── Text-only section ── */
                            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">

                                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-snug">
                                    {extractFirstText(textCol?.richText)}
                                </h2>
                                <div className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed prose prose-muted">
                                    <RichText data={richTextWithoutTitle(textCol?.richText)} />
                                </div>
                            </div>
                        ) : (
                            /* ── Two-column text + image ── */
                            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 grid gap-12 lg:grid-cols-2 items-center">
                                <div className={reversed ? "lg:order-2" : ""}>

                                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-snug">
                                        {extractFirstText(textCol?.richText)}
                                    </h2>
                                    <div className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed prose prose-muted">
                                        <RichText data={richTextWithoutTitle(textCol?.richText)} />
                                    </div>
                                </div>
                                <div className={`relative ${reversed ? "lg:order-1" : ""}`}>
                                    <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                                        <Image
                                            src={media?.url || heroImg.src}
                                            alt={media?.alt || "Chariots of Destiny Children's Center"}
                                            className="w-full h-auto object-cover"
                                            width={media?.width || 800}
                                            height={media?.height || 600}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                );
            })}

            {/* ── CTA BLOCKS ── */}
            {ctaBlocks.map((block, idx) => (
                <section
                    key={block.id || `cta-${idx}`}
                    className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20"
                >
                    <CallToActionBlock {...block} />
                </section>
            ))}
        </Layout>
    );
}

function extractFirstMedia(richText?: any): {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
} | null {
    const nodes = richText?.root?.children;
    if (!nodes) return null;
    const queue: any[] = [...nodes];
    while (queue.length > 0) {
        const node = queue.shift();
        const value = node?.value;
        const url = value?.cloudinary?.secure_url || value?.url;
        if (typeof url === "string" && url.length > 0) {
            return { url, alt: value?.alt, width: value?.width, height: value?.height };
        }
        if (Array.isArray(node?.children)) queue.push(...node.children);
    }
    return null;
}

// Add this helper near the bottom of the file (alongside extractFirstMedia)
function richTextWithoutTitle(richText?: any): any {
    const root = richText?.root;
    if (!root) return null;
    const children = root.children ?? [];
    return {
        ...richText,
        root: {
            ...root,
            children: children.slice(1), // drop the first child (the title)
        },
    };
}