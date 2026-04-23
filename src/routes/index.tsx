import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-children.jpg";
import classroomImg from "@/assets/classroom.jpg";
import doodleSun from "@/assets/doodle-sun.png";
import doodlePlane from "@/assets/doodle-plane.png";
import doodleBook from "@/assets/doodle-book.png";
import { programs, site, stories } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hope House — A home, a school, a future" },
      { name: "description", content: "A church-founded children's home and school. Give, follow every cent, and watch a childhood blossom." },
      { property: "og:title", content: "Hope House — A home, a school, a future" },
      { property: "og:description", content: "A church-founded children's home and school. Give, follow every cent, and watch a childhood blossom." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <img
          src={doodleSun}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-6 -left-8 h-28 w-28 opacity-90 animate-float-slow"
        />
        <img
          src={doodlePlane}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-24 right-8 h-20 w-20 opacity-90 animate-float-medium hidden sm:block"
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-28 grid gap-12 lg:grid-cols-2 items-center">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Founded by Riverside Church · Est. {site.founded}
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              A <span className="crayon-underline">home</span>, a school,
              <br className="hidden sm:block" /> a future for every child.
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground">
              {site.shortDescription} Every gift you make is logged and reported back to you, every quarter.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full shadow-pop font-semibold">
                <Link to="/donate"><Heart className="h-5 w-5" /> Donate now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full font-semibold">
                <Link to="/accountability">See where it goes <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <Stat value={site.childrenServed} label="Children at home" />
              <Stat value={site.graduates} label="Graduates since 2009" />
              <Stat value="100%" label="Funds publicly logged" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-warm rounded-[2.5rem] blur-2xl opacity-60" aria-hidden />
            <img
              src={heroImg}
              alt="Children playing and learning in the Hope House garden"
              width={1536}
              height={1024}
              className="relative rounded-[2rem] shadow-lift border-4 border-card"
            />
            <img
              src={doodleBook}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 animate-wiggle"
            />
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">Built on trust, run with love.</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            We're a small team — house parents, teachers, a nurse, and a treasurer. Every quarter we publish a plain-English report of what came in and how it was spent. No surprises.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <div
              key={p.title}
              className="group rounded-3xl bg-card border border-border p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-3 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <img
              src={classroomImg}
              alt="A teacher reading with three children"
              loading="lazy"
              width={1280}
              height={896}
              className="rounded-[2rem] shadow-lift border-4 border-card"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">In their own words.</h2>
            <p className="mt-3 text-muted-foreground">A few of the kids you'd meet if you visited us today.</p>
            <div className="mt-6 space-y-4">
              {stories.map((s) => (
                <figure
                  key={s.name}
                  className="rounded-2xl bg-card p-5 border border-border shadow-soft"
                >
                  <blockquote className="text-foreground/90 leading-relaxed">
                    “{s.quote}”
                  </blockquote>
                  <figcaption className="mt-2 text-sm font-semibold text-primary">
                    — {s.name}, age {s.age}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground p-10 sm:p-14 shadow-lift">
          <div className="relative z-10 max-w-xl">
            <ShieldCheck className="h-10 w-10 mb-4 opacity-90" />
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">Give once. Watch the receipts forever.</h2>
            <p className="mt-3 text-primary-foreground/90">
              Pick an amount, see what it covers, and find your contribution in our next quarterly report.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full font-semibold shadow-pop">
                <Link to="/donate"><Heart className="h-5 w-5" /> Donate now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full font-semibold border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/accountability">View latest report</Link>
              </Button>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-sun/40 blur-3xl" aria-hidden />
        </div>
      </section>
    </Layout>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl sm:text-3xl font-semibold text-primary">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}
