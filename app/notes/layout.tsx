import Heading from "@/app/components/Heading";

export default function Layout({ children }: LayoutProps<"/notes">) {
  return (
    <div className="mt-6 flex min-h-screen flex-col margin-auto items-center px-4 sm:px-0">
      <div className="flex flex-1 flex-col gap-22 margin-auto items-center">
        <Heading />
        {children}
      </div>
      <footer className="mt-auto pt-12 pb-8 sm:pt-22 sm:pb-16 text-balance">
        <blockquote className="text-lg font-serif italic text-center">
          The successful warrior is the average man, with laser-like focus.
        </blockquote>
      </footer>
    </div>
  );
}
