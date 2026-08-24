import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().default(""),
  CONTACT_TO_EMAIL: z.string().email().default("phamduy8896@gmail.com"),
  TURNSTILE_SECRET_KEY: z.string().default(""),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().default(""),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://charlie-pham.vercel.app"),
});

// Empty local values keep static content builds deterministic; the action rejects
// a live submission until the deployment has real provider configuration.
export const env = envSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
