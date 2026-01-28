import { Notes } from "app/components/notes";

export default async function Page() {
  return (
    <section className="flex flex-col gap-8">
      <figure className="flex flex-col gap-4">
        <blockquote className="text-lg font-serif italic">
          The successful warrior is the average man, with laser-like focus.
        </blockquote>
        <figcaption className="text-sm dark:text-slate-400 text-slate-600">
          - Bruce Lee
        </figcaption>
      </figure>
      <Notes />
    </section>
  );
}
