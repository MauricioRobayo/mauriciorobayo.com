export default function Layout({ children }: LayoutProps<"/notes">) {
  return (
    <div className="prose px-4 sm:px-0 prose-headings:text-center prose-headings:text-balance">
      {children}
    </div>
  );
}
