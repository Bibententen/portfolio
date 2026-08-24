import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  return (
    <header className="border-border bg-bg/95 sticky top-0 z-40 border-b backdrop-blur">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="site-container relative flex min-h-16 items-center justify-between gap-4">
        <Link className="font-mono text-sm font-medium tracking-tight" href="/">
          Duy (Charlie) Pham
        </Link>
        <div className="flex items-center gap-2">
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            {links.map(([label, href]) => (
              <Link
                prefetch={href === "/contact" ? false : undefined}
                className="text-muted hover:bg-surface hover:text-text rounded-[var(--radius-control)] px-3 py-2 text-sm"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            prefetch={false}
            className="bg-accent text-on-accent hover:bg-accent-hover hidden rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium md:inline-flex"
            href="/resume"
          >
            Download CV
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
