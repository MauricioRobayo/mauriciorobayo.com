import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface NavPage {
  title: string;
  route: string;
  isActive: boolean;
}
interface HeaderProps {
  navPages: NavPage[];
  children: ReactNode;
  className?: string;
}
export function Header({ navPages, children, className }: HeaderProps) {
  return (
    <header className={twMerge("mb-8", className)}>
      <div className="flex justify-between items-center flex-col sm:flex-row sm:items-baseline">
        {children}
        <nav>
          <ul className="flex gap-4 list-none p-0 m-0 text-gray-400">
            {navPages.map((page) => {
              const { title, route, isActive } = page;
              return (
                <li key={route} className="p-0 m-0">
                  {isActive ? (
                    <div className="">{title}</div>
                  ) : (
                    <Link href={route}>
                      <div>{title}</div>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
