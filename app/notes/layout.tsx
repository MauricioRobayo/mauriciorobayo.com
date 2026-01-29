import Header from "@/app/components/Heading";

export default function Layout({ children }: LayoutProps<"/notes">) {
  return (
    <div className="mt-6 flex min-h-screen flex-col margin-auto items-center">
      <div className="flex flex-1 flex-col gap-22 margin-auto items-center">
        <Header />
        {children}
      </div>
      <footer className="mt-auto py-16">
        <blockquote className="text-lg font-serif italic">
          The successful warrior is the average man, with laser-like focus.
        </blockquote>
      </footer>
    </div>
  );
}
