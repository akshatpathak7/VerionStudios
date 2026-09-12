import { z } from "zod";

export const reviewSchema = z.object({
  submissionId: z.string().uuid(),
  name: z.string().trim().max(100, "Keep your name under 100 characters."),
  affiliation: z.string().trim().max(160, "Keep your affiliation under 160 characters."),
  service: z.string().trim().min(2, "Please tell us which service you used.").max(200),
  review: z.string().trim().min(10, "Please write at least 10 characters.").max(5000, "Keep your review under 5,000 characters."),
  publicationConsent: z.boolean(),
  website: z.string().max(200).optional().default(""),
}).strict();

export type ReviewInput = z.infer<typeof reviewSchema>;
