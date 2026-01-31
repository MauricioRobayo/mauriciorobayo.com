export default function Layout({ children }: LayoutProps<"/notes">) {
  return (
    <div className="prose prose-headings:text-center prose-headings:text-balance dark:prose-invert">
      {children}
    </div>
  );
}
