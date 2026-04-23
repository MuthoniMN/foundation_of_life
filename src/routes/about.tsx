import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import communityImg from "@/assets/community.jpg";
import { site } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Hope House" },
      { name: "description", content: `How a small church started a home and school in ${site.founded}, and the family it has become.` },
      { property: "og:title", content: "Our Story — Hope House" },
      { property: "og:description", content: "How a small church started a home and school, and the family it has become." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our story</span>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight">
          A church, a couple of spare rooms, and one promise.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          In {site.founded}, members of Riverside Church opened their doors to four children who had nowhere safe to sleep. A decade and a half later, those four rooms have become a home for {site.childrenServed} children, with a school built across the courtyard.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <img
          src={communityImg}
          alt="The Hope House chapel and grounds"
          loading="lazy"
          width={1280}
          height={896}
          className="rounded-[2rem] shadow-lift border-4 border-card w-full"
        />
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 prose prose-neutral">
        <h2 className="font-display text-3xl font-semibold">What we believe</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Every child deserves a bed that is theirs, an adult who knows their name, and an education that opens the world to them. Faith shapes everything we do — but the school is open to every child, and the family table has room for everyone.
        </p>

        <h2 className="mt-12 font-display text-3xl font-semibold">How we're funded</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We're sustained almost entirely by individual donors and partner churches. We don't take government funding, and we publish a complete summary of every quarter's income and spending on this website. If you ever want to see more detail, just ask — our books are open.
        </p>

        <h2 className="mt-12 font-display text-3xl font-semibold">Who we are</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>• 9 house parents and aunties who live on-site</li>
          <li>• 11 full-time teachers (pre-primary through secondary)</li>
          <li>• 1 nurse, 1 counselor, 1 cook, 1 grounds keeper</li>
          <li>• A treasurer and a board of 5 (3 from the church, 2 independent)</li>
        </ul>
      </section>
    </Layout>
  );
}
