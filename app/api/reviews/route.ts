import { put, get } from "@vercel/blob";
import { reviewSchema } from "@/lib/review-validation";

export const runtime = "nodejs";
const MAX_BYTES = 24_000;
const headers = { "Cache-Control": "no-store" };

function respond(body: object, status: number) {
  return Response.json(body, { status, headers });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return respond({ error: "Please submit your review from our website." }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return respond({ error: "Unsupported request format." }, 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_BYTES) {
    return respond({ error: "Your submission is too long." }, 413);
  }
  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return respond({ error: "Please complete the review form." }, 400);
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        await reader.cancel();
        return respond({ error: "Your submission is too long." }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    input = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return respond({ error: "Please check the form and try again." }, 400);
  }
  const result = reviewSchema.safeParse(input);
  if (!result.success) {
    return respond({ error: "Please check the form fields.", fields: result.error.flatten().fieldErrors }, 400);
  }
  const { submissionId, name, affiliation, service, review, publicationConsent, website } = result.data;
  // Honeypot submissions are rejected without writing to storage.
  if (website) return respond({ error: "We could not accept this submission." }, 400);
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return respond({ error: "Reviews are temporarily unavailable. Please try again later." }, 503);
  }
  const record = {
    schemaVersion: 1,
    id: submissionId,
    createdAt: new Date().toISOString(),
    name: name || null,
    affiliation: affiliation || null,
    service,
    review,
    publicationConsent,
    consentVersion: "2026-09-12",
    moderationStatus: "pending",
    featured: false,
  };
  try {
    await put(`reviews/${submissionId}.json`, JSON.stringify(record), {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: false,
    });
  } catch {
    // Verify the saved payload after an uncertain write or duplicate receipt.
    try {
      const existing = await get(`reviews/${submissionId}.json`, {
        access: "private", token: process.env.BLOB_READ_WRITE_TOKEN, useCache: false,
      });
      if (existing?.statusCode === 200) {
        const saved = await new Response(existing.stream).json() as Partial<typeof record>;
        if (saved.id === record.id && saved.name === record.name &&
            saved.affiliation === record.affiliation && saved.service === record.service &&
            saved.review === record.review && saved.publicationConsent === record.publicationConsent) {
          return respond({ success: true, receipt: submissionId }, 200);
        }
        return respond({ error: "This submission reference has already been used. Please submit the form again." }, 409);
      }
    } catch { /* The original failure remains unavailable to the client. */ }
    console.error("Review storage write failed.");
    return respond({ error: "Your review could not be saved. Please try again." }, 503);
  }
  return respond({ success: true, receipt: submissionId }, 201);
}
