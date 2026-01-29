export default function Layout({ children }: LayoutProps<"/notes">) {
  return <div className="prose">{children}</div>;
}
