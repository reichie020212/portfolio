import Link from "next/link";
import { navLinks } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  return (
    <header className="topbar" role="banner">
      <Link href="#top" className="brand" aria-label="redick.butay — back to top">
        <span className="dot" aria-hidden="true" />
        redick.butay
      </Link>
      <nav aria-label="Primary">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
