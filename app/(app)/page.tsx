import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import doodleSun from "@/public/assets/doodle-sun.png";
import doodlePlane from "@/public/assets/doodle-plane.png";
import doodleBook from "@/public/assets/doodle-book.png";
import heroImg from "@/public/assets/hero-children.jpg";
import { programs } from "@/content/site";
import { getPayload } from "payload";
import config from "@/payload.config";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import type { ContentBlock, Page } from "@/payload-types";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
  });
  const page = docs[0];

  return {
    title: page?.meta?.title || "Chariots of Destiny Children's Center — A home, a school, a future",
    description: page?.meta?.description || "A church-founded children's home and school.",
    openGraph: {
      title: page?.meta?.title || "Chariots of Destiny Children's Center — A home, a school, a future",
      description: page?.meta?.description || "A church-founded children's home and school.",
    },
  };
}

export default async function HomePage() {
  const payload = await getPayload({ config });
  const site = await payload.findGlobal({ slug: "site-settings" });
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
  });
  const page = docs[0];

  const contentBlocks =
    page?.layout?.filter((block): block is ContentBlock => block.blockType === "content") || [];
  const ctaBlocks = page?.layout?.filter((block) => block.blockType === "cta") || [];
  const hero = contentBlocks.find((b) => b.blockName === "Hero") || contentBlocks[0];
  const nonHeroContent = contentBlocks.filter((b) => b !== hero);
  const homeSections = nonHeroContent.slice(0, 2);

  const heroTitle = extractFirstText(hero?.columns?.[0]?.richText)?.split(" ") || [
    "A", "home,", "a", "school,", "a", "future", "for", "every", "child.",
  ];
  const heroMedia = extractFirstMedia(hero?.columns?.[1]?.richText);

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary-light">
        {/* Doodle accents */}
        <Image src={doodleSun} alt="" aria-hidden className="pointer-events-none absolute -top-6 -left-8 h-28 w-28 opacity-60 animate-float-slow" />
        <Image src={doodlePlane} alt="" aria-hidden className="pointer-events-none absolute top-24 right-8 h-20 w-20 opacity-60 animate-float-medium hidden sm:block" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-28 grid gap-12 lg:grid-cols-2 items-center">
          <div className="animate-rise">
            {/* Founded badge */}
            <span className="inline-flex items-center gap-2 rounded-sm bg-white border border-border px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Founded by Fountain of Life Churches International · Est. {site.founded}
            </span>

            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-foreground">
              {heroTitle.join(" ")}
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {hero?.columns?.[0]?.richText?.root?.children?.[1]?.children?.[0]?.text || site.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold text-sm rounded-sm hover:bg-primary-hover transition-colors"
              >
                <Heart className="h-4 w-4 fill-current" /> Donate now
              </Link>
              <Link
                href="/accountability"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold text-sm rounded-sm hover:bg-primary-light transition-colors"
              >
                See where it goes <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10 border-t border-border pt-8">
              <Stat value={site.numberOfChildrenSupported} label="Children in our care" />
              <Stat value="100%" label="Funds publicly logged" />
            </div>
          </div>

          {/* Hero image — clean border, no glow blob */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <Image
                src={heroMedia?.url || heroImg.src}
                alt={heroMedia?.alt || "Children at Chariots of Destiny Children's Center"}
                className="w-full h-auto object-cover"
                width={heroMedia?.width || 800}
                height={heroMedia?.height || 600}
              />
            </div>
            <Image
              src={doodleBook}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 animate-wiggle"
            />
          </div>
        </div>
      </section>

      {/* ── PROMISE / PROGRAMS ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Built on trust, run with love.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            We're a small team — house parents, teachers, a nurse, and a treasurer.
            Every quarter we publish a plain-English report of what came in and how
            it was spent. No surprises.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <div
              key={p.title}
              className="group rounded-xl bg-card border border-border p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-serif text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTENT SECTIONS ── */}
      {homeSections.map((section, idx) => {
        const textCol = section.columns?.[0];
        const imageCol = section.columns?.[1];
        const media = extractFirstMedia(imageCol?.richText);
        const reversed = idx % 2 === 1;

        return (
          <section
            key={section.id || `${section.blockName || "section"}-${idx}`}
            className={idx % 2 === 1 ? "bg-muted" : ""}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 items-center">
              <div className={reversed ? "lg:order-2" : ""}>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-snug">
                  {extractFirstText(textCol?.richText)}
                </h2>
                <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {textCol?.richText?.root?.children?.[1]?.children?.[0]?.text}
                </p>
              </div>
              <div className={`relative ${reversed ? "lg:order-1" : ""}`}>
                <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src={media?.url || heroImg.src}
                    alt={media?.alt || "Chariots of Destiny community"}
                    className="w-full h-auto object-cover"
                    width={media?.width || 800}
                    height={media?.height || 600}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA BLOCKS ── */}
      {ctaBlocks.map((block, idx) => (
        <section key={block.id || `cta-${idx}`} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <CallToActionBlock {...block} />
        </section>
      ))}
    </Layout>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}

export function extractFirstText(richText?: any): string | null {
  const nodes = richText?.root?.children;
  if (!nodes) return null;
  const queue: any[] = [...nodes];
  while (queue.length > 0) {
    const node = queue.shift();
    if (typeof node?.text === "string" && node.text.trim().length > 0) return node.text.trim();
    if (Array.isArray(node?.children)) queue.push(...node.children);
  }
  return null;
}

function extractFirstMedia(richText?: any): { url: string; alt?: string; width?: number; height?: number } | null {
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