import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import mealtimeImg from "@/assets/mealtime.jpg";
import { programs } from "@/content/site";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Hope House" },
      { name: "description", content: "Home, school, health and play. The four parts of a Hope House childhood." },
      { property: "og:title", content: "Programs — Hope House" },
      { property: "og:description", content: "Home, school, health and play. The four parts of a Hope House childhood." },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Programs</span>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight">
          Four parts of a childhood that's whole.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          We don't just keep kids housed. We give them a place to belong, a teacher who knows their handwriting, and a chance to be small for as long as it lasts.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 grid gap-5 sm:grid-cols-2">
        {programs.map((p) => (
          <article key={p.title} className="rounded-3xl bg-card border border-border p-7 shadow-soft">
            <div className="text-4xl">{p.icon}</div>
            <h2 className="mt-4 font-display text-2xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{p.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 lg:grid-cols-2 items-center">
        <img
          src={mealtimeImg}
          alt="Children sharing dinner at the Hope House dining table"
          loading="lazy"
          width={1280}
          height={896}
          className="rounded-[2rem] shadow-lift border-4 border-card"
        />
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">A day at Hope House</h2>
          <ul className="mt-5 space-y-3 text-muted-foreground">
            <li><span className="font-semibold text-foreground">6:30 am</span> — wake up, brush teeth, breakfast together.</li>
            <li><span className="font-semibold text-foreground">8:00 am</span> — school bell rings across the courtyard.</li>
            <li><span className="font-semibold text-foreground">12:30 pm</span> — lunch, then a quiet hour to read.</li>
            <li><span className="font-semibold text-foreground">3:30 pm</span> — clubs: football, choir, art, garden.</li>
            <li><span className="font-semibold text-foreground">6:30 pm</span> — dinner, prayers, bedtime stories.</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
