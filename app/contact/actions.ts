"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/content/schema";
import { env } from "@/lib/env";
import { send } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/rate-limit";

export type ContactFormState =
  | { ok: true; message: string }
  | { ok: false; message?: string; fieldErrors?: Record<string, string[]> };

const successMessage =
  "Thanks for getting in touch. I read every message and usually reply within a couple of days.";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) return false;
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    },
  );
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function sendContactMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot first: bots receive a success response and never reach providers.
  if (String(formData.get("company_website") ?? "").trim())
    return { ok: true, message: successMessage };

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip))
    return {
      ok: false,
      message: "Too many submissions. Please try again later.",
    };

  const token = String(formData.get("turnstile_token") ?? "");
  if (!(await verifyTurnstile(token, ip)))
    return {
      ok: false,
      message:
        "Bot verification could not be completed. Please try again later.",
    };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    message: formData.get("message"),
    turnstile_token: token,
  });
  if (!parsed.success)
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };

  try {
    await send(parsed.data);
    return { ok: true, message: successMessage };
  } catch (error) {
    console.error("Contact delivery failed", error);
    return {
      ok: false,
      message:
        "The message could not be sent. Please email me directly instead.",
    };
  }
}
