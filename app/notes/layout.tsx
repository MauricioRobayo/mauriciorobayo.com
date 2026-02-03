import { Footer } from "@/app/components/Footer";
import Heading from "@/app/components/Heading";

export default function Layout({ children }: LayoutProps<"/notes">) {
  return (
    <div className="mt-6 flex min-h-screen flex-col margin-auto items-center px-4 sm:px-0">
      <div className="flex flex-1 flex-col gap-22 margin-auto items-center">
        <Heading />
        {children}
      </div>
      <Footer />
    </div>
  );
}
