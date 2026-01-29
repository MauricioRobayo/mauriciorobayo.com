import Header from "@/app/Components/Header";

export default function Layout({ children }: LayoutProps<"/notes">) {
  return (
    <div className="mt-6 flex flex-col gap-22 margin-auto items-center">
      <Header />
      {children}
    </div>
  );
}
