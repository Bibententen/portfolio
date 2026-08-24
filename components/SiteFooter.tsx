import Link from "next/link";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
] as const;

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="site-container text-muted flex flex-col gap-5 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Duy (Charlie) Pham</p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link
                  prefetch={href === "/contact" ? false : undefined}
                  className="hover:text-text"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link prefetch={false} className="hover:text-text" href="/resume">
                Download CV
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
