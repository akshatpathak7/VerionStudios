import type { Metadata } from "next";
import { LegalLayout } from "../legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | Verion Studios",
  description: "How Verion Studios handles website visits, review submissions, and information shared through email inquiries."
};

export default function PrivacyPolicy() {
  return <LegalLayout title="Privacy policy">
    <p>This policy explains how Verion Studios handles information when you visit this website submit a review, or contact us about our services.</p>
    <section><h2>Information you share</h2><p>If you email us, we receive your email address and the information you choose to include, such as your name, project requirements, and attachments. Please share only what is needed to discuss your inquiry.</p></section>
    <section><h2>Reviews you submit</h2><p>The review form collects the service you received, your review, and any name or affiliation you choose to provide. We also save a submission reference, the date, and whether you give permission for future publication. Name, affiliation, and publication permission are optional.</p><p>Submissions are stored in private Vercel Blob storage for our team to read and assess. Reviews are not displayed publicly or published automatically. If you give permission, we may later select your review for display with the name and affiliation you provided. Reviews without permission are kept for internal feedback only.</p><p>You can ask us to correct or delete a review, or withdraw publication permission, using either contact address below. Include your submission reference if available so we can locate it. We retain reviews while they are useful for feedback or an authorized testimonial, subject to deletion requests and applicable obligations.</p></section>
    <section><h2>How we use your information</h2><p>We use the information you send to respond to your questions, understand your project, and communicate with you about a possible engagement. Any additional arrangements for handling client materials can be addressed in a separate project agreement.</p></section>
    <section><h2>Website hosting and email</h2><p>This website is hosted on Vercel. Our hosting and email providers process information needed to deliver their services. Hosting may involve technical information such as IP addresses, browser details, and request logs for operation and security. See <a href="https://vercel.com/legal/privacy-notice">Vercel’s privacy notice</a> for information about its practices.</p><p>The current website includes a review submission form but no advertising trackers or application analytics integration. Email links open your email application. Hosting and security services may have their own technical storage or logging behavior.</p></section>
    <section><h2>Keeping and protecting information</h2><p>We retain inquiry correspondence for as long as it is needed to respond to you, manage the discussion, and meet any applicable recordkeeping obligations. Retention may also depend on a later project agreement. No method of sending or storing information online can be guaranteed to be completely secure.</p></section>
    <section><h2>Requests about your information</h2><p>You can contact us to ask about information you have shared, correct it, or request its deletion. We may need to confirm your identity before responding. Some information may need to be retained to meet applicable obligations.</p></section>
    <section><h2>Changes to this policy</h2><p>We may update this policy when our website or practices change. The date at the top shows when this page was last updated.</p></section>
  </LegalLayout>;
}
