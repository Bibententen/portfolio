import { Resend } from "resend";
import { env } from "@/lib/env";

export type ContactPayload = Readonly<{
  name: string;
  email: string;
  company: string;
  message: string;
}>;

export async function send(payload: ContactPayload): Promise<void> {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    throw new Error("Contact provider is not configured");
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [env.CONTACT_TO_EMAIL],
    replyTo: payload.email,
    subject: `Portfolio enquiry from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Company: ${payload.company || "Not supplied"}`,
      `Email: ${payload.email}`,
      "",
      payload.message,
    ].join("\n"),
  });

  if (result.error) throw new Error(result.error.message);
}
