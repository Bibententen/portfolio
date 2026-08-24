"use client";

// Client island: pending, validation and Turnstile widget state need browser interactivity.
import { useActionState, useEffect, useRef, useState } from "react";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/contact/actions";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => void;
    };
  }
}

const initialState: ContactFormState = { ok: false };
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const [token, setToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteKey || !turnstileRef.current) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (turnstileRef.current && window.turnstile) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: setToken,
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      }
    };
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  if (state.ok) {
    return (
      <div
        className="border-border bg-surface rounded-[var(--radius-card)] border p-6"
        role="status"
        aria-live="polite"
      >
        <p className="eyebrow">Message sent</p>
        <p className="mt-3 text-lg">{state.message}</p>
        <a className="text-link mt-5 inline-block" href="/contact">
          Send another message
        </a>
      </div>
    );
  }

  const fieldError = (field: string) => state.fieldErrors?.[field];
  const describedBy = (field: string) =>
    fieldError(field) ? `${field}-error` : undefined;

  return (
    <form className="space-y-5" action={formAction} noValidate>
      <div>
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          aria-invalid={Boolean(fieldError("name"))}
          aria-describedby={describedBy("name")}
        />
        {fieldError("name") ? (
          <p className="form-error" id="name-error">
            {fieldError("name")?.join(", ")}
          </p>
        ) : null}
      </div>
      <div>
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(fieldError("email"))}
          aria-describedby={describedBy("email")}
        />
        {fieldError("email") ? (
          <p className="form-error" id="email-error">
            {fieldError("email")?.join(", ")}
          </p>
        ) : null}
      </div>
      <div>
        <label className="form-label" htmlFor="company">
          Company <span className="text-muted">(optional)</span>
        </label>
        <input
          className="form-control"
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={120}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="message">
          Message
        </label>
        <textarea
          className="form-control min-h-40"
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={2000}
          aria-invalid={Boolean(fieldError("message"))}
          aria-describedby={describedBy("message")}
        />
        {fieldError("message") ? (
          <p className="form-error" id="message-error">
            {fieldError("message")?.join(", ")}
          </p>
        ) : null}
      </div>
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div>
        <div ref={turnstileRef} aria-describedby="turnstile-help" />
        <input name="turnstile_token" type="hidden" value={token} readOnly />
        <p className="text-muted mt-2 text-sm" id="turnstile-help">
          Bot protection activates when the site key is configured.
        </p>
      </div>
      {state.message ? (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      ) : null}
      <button
        className="bg-accent text-on-accent hover:bg-accent-hover rounded-[var(--radius-control)] px-4 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={pending}
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
