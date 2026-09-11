import type { Metadata } from "next";
import { LegalLayout } from "../legal-layout";

export const metadata: Metadata = {
  title: "Terms and Conditions | Verion Studios",
  description: "Terms for using the Verion Studios website and making service inquiries."
};

export default function TermsAndConditions() {
  return <LegalLayout title="Terms and conditions">
    <p>These terms describe the permitted use of the Verion Studios website. They apply to browsing this site and making inquiries about our services.</p>
    <section><h2>Website information</h2><p>This website provides general information about our video editing and web development services. We aim to keep that information accurate, but it may change and should not be treated as a confirmed quotation, delivery commitment, or guarantee of a particular result.</p></section>
    <section><h2>Project inquiries</h2><p>Sending an email or discussing an idea does not, by itself, establish a service agreement. The scope, fees, timelines, revisions, cancellation arrangements, and ownership of project deliverables are to be agreed separately before work begins.</p></section>
    <section><h2>Acceptable use</h2><p>You may browse the website and contact us for legitimate inquiries. You must not attempt to disrupt the site, access systems without permission, distribute malicious software, or use the site for unlawful activity. Only send materials you are authorized to share.</p></section>
    <section><h2>Website content</h2><p>The website’s branding, text, and design belong to Verion Studios or their respective rights holders. Browsing the site does not grant permission to reproduce or commercially reuse that content. Rights in client project materials and deliverables are handled through separate agreements.</p></section>
    <section><h2>External services and availability</h2><p>Links to external websites are provided for reference. Those services have their own terms and privacy practices. We do not guarantee uninterrupted website availability or the accuracy of external content. Nothing on this page excludes rights or responsibilities that cannot be excluded under applicable law.</p></section>
    <section><h2>Updates to these terms</h2><p>We may revise these terms when the website changes. The date at the top identifies the latest update. These website terms do not replace a separate agreement for client work.</p></section>
  </LegalLayout>;
}
