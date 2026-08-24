import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/content/profile";
import { canonicalMetadata } from "@/lib/seo";

export const dynamic = "error";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Duy (Charlie) Pham about data analyst roles across Australia or remote.",
  ...canonicalMetadata("/contact"),
};

export default function ContactPage() {
  return (
    <main id="main" className="site-container page-shell">
      <header className="max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-4">Get in touch</h1>
        <p className="text-muted mt-6 text-xl">
          I am open to data analyst roles across Australia or remote. I read
          every message and usually reply within a couple of days.
        </p>
      </header>
      <div className="section-space grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <ContactForm />
        <aside aria-labelledby="contact-alternatives-heading">
          <h2 id="contact-alternatives-heading" className="heading-2">
            Directly
          </h2>
          <ul className="text-link mt-5 space-y-3">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.linkedin}>LinkedIn</a>
            </li>
            <li>
              <a href={profile.github}>GitHub</a>
            </li>
            <li>
              <a href="/resume">Download CV PDF</a>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
