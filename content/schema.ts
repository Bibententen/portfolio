import { z } from "zod";

const urlSchema = z.string().url();

export const projectFrontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  outcome: z.string().min(1),
  date: z.string().optional(),
  featured: z.boolean(),
  tags: z.array(z.string()).min(1),
  stack: z.array(z.string()).min(1),
  repo: urlSchema,
  notebook: z.string().optional(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  glance: z.object({
    problemType: z.string().min(1),
    dataset: z.string().min(1),
    bestModel: z.string().min(1),
    headline: z.string().min(1),
  }),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  company: z.string().trim().max(120),
  message: z.string().trim().min(20).max(2000),
  turnstile_token: z.string().min(1),
});
