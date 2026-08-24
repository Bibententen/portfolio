"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="text-muted hover:bg-surface hover:text-text rounded-[var(--radius-control)] p-2"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? (
          <X aria-hidden="true" size={22} />
        ) : (
          <Menu aria-hidden="true" size={22} />
        )}
      </button>
      {open ? (
        <nav
          id="mobile-navigation"
          className="border-border bg-bg absolute inset-x-0 top-full border-b px-5 py-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  className="text-muted hover:bg-surface hover:text-text block rounded-[var(--radius-control)] px-3 py-2"
                  href={href}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
