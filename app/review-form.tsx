"use client";

import { useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { reviewSchema } from "@/lib/review-validation";

type FieldErrors = Record<string, string[] | undefined>;

export function ReviewForm() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FieldErrors>({});
  const [receipt, setReceipt] = useState("");
  const [consent, setConsent] = useState(false);
  const submissionId = useRef("");
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submissionId.current ||= crypto.randomUUID();
    const values = {
      submissionId: submissionId.current,
      name: String(data.get("name") || ""),
      affiliation: String(data.get("affiliation") || ""),
      service: String(data.get("service") || ""),
      review: String(data.get("review") || ""),
      publicationConsent: consent,
      website: String(data.get("website") || ""),
    };
    const parsed = reviewSchema.safeParse(values);
    setError("");
    setFields({});
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFields(errors);
      setError("Please check the highlighted fields.");
      const first = Object.keys(errors)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    inFlight.current = true;
    setSending(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json() as { success?: boolean; receipt?: string; fields?: FieldErrors; error?: string };
      if (!response.ok || result.success !== true || !result.receipt) {
        if (response.status === 409) submissionId.current = "";
        setFields(result.fields || {});
        setError(result.error || "Your review could not be saved. Please try again.");
        return;
      }
      setReceipt(result.receipt);
    } catch {
      setError("We couldn’t confirm your submission. Please try again. Your text is still here.");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return <section className="reviews wrap" id="leave-review" aria-labelledby="review-title">
    <div className="review-heading"><h2 id="review-title">How was your experience?</h2><p>If we’ve worked together, we’d appreciate your feedback.</p></div>
    {receipt ? <div className="review-success" role="status" tabIndex={-1}>
      <h3>Thank you for your review</h3><p>Your feedback has been saved privately. It has not been published.</p>
      <p className="review-receipt">Reference: {receipt}</p>
    </div> : <form className="review-form" onSubmit={submit} onChange={()=>{ submissionId.current = ""; }} aria-busy={sending}>
      <fieldset disabled={sending}>
        <div className="review-grid">
          <div className="review-field"><label htmlFor="review-name">Name <span>(optional)</span></label><Input id="review-name" name="name" autoComplete="name" maxLength={100} aria-invalid={!!fields.name} aria-describedby={fields.name?"name-error":undefined}/>{fields.name && <p id="name-error" className="field-error">{fields.name[0]}</p>}</div>
          <div className="review-field"><label htmlFor="review-affiliation">Company or affiliation <span>(optional)</span></label><Input id="review-affiliation" name="affiliation" autoComplete="organization" maxLength={160} aria-invalid={!!fields.affiliation} aria-describedby={fields.affiliation?"affiliation-error":undefined}/>{fields.affiliation && <p id="affiliation-error" className="field-error">{fields.affiliation[0]}</p>}</div>
        </div>
        <div className="review-field"><label htmlFor="review-service">Which service did we provide?</label><Input id="review-service" name="service" required minLength={2} maxLength={200} placeholder="For example, podcast editing or website development" aria-invalid={!!fields.service} aria-describedby={fields.service?"service-error":undefined}/>{fields.service && <p id="service-error" className="field-error">{fields.service[0]}</p>}</div>
        <div className="review-field"><label htmlFor="review-text">Your review</label><Textarea id="review-text" name="review" required minLength={10} maxLength={5000} rows={5} placeholder="Tell us what worked well and what we could improve." aria-invalid={!!fields.review} aria-describedby={fields.review?"review-help review-error":"review-help"}/><p className="field-hint" id="review-help">10 to 5,000 characters. Please leave out confidential project details.</p>{fields.review && <p id="review-error" className="field-error">{fields.review[0]}</p>}</div>
        <div className="review-trap" aria-hidden="true"><label htmlFor="review-website">Leave this field empty</label><input id="review-website" name="website" tabIndex={-1} autoComplete="off"/></div>
        <div className="review-consent"><Checkbox id="review-consent" checked={consent} onCheckedChange={value=>setConsent(value===true)}/><label htmlFor="review-consent">You may feature my review, name, and affiliation on this website in the future. <span>(optional)</span></label></div>
        <p className="review-note">Reviews are stored privately for our team to read. Nothing is published automatically. Read our <a href="/privacy-policy">privacy policy</a>.</p>
        <Button className="button button-primary review-submit" type="submit" disabled={sending}>{sending?"Saving your review…":"Submit review"}</Button>
      </fieldset>
      {error && <p className="review-error" role="alert">{error}</p>}
    </form>}
  </section>;
}
