import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Endeavor Search Partners collects, uses, and protects information you share with us.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead="This policy explains what we collect, how we use it, and the choices you have."
      />
      <Section tone="paper" narrow>
        <article className="legal max-w-readable text-slate-800">
          <p>
            <strong>Effective date:</strong> January 1, 2026
          </p>

          <h2>1. Introduction</h2>
          <p>
            Endeavor S.P., Inc. (&ldquo;Endeavor Search Partners,&rdquo;
            &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects
            your privacy. This policy describes how we collect, use, and
            safeguard information when you visit our website or communicate
            with us.
          </p>

          <h2>2. Information we collect</h2>
          <p>We may collect the following, depending on how you interact with us:</p>
          <ul>
            <li>Contact details such as name, email, phone number, and firm affiliation</li>
            <li>Professional details relevant to recruiting (e.g., licensing, industry role)</li>
            <li>Communications you share with us (emails, call notes, SMS, form submissions)</li>
            <li>Basic technical data such as IP address, browser type, and site usage via analytics tools</li>
          </ul>

          <h2>3. How we use your information</h2>
          <p>We use information to:</p>
          <ul>
            <li>Respond to inquiries and coordinate conversations</li>
            <li>Evaluate recruiting opportunities and introduce aligned firms</li>
            <li>Send updates related to recruiting discussions when you ask us to</li>
            <li>Improve our website and services</li>
            <li>Meet legal and regulatory obligations</li>
          </ul>

          <h2>4. SMS communications</h2>
          <p>
            If you opt in, you may receive text messages related to recruiting
            discussions, scheduling, and follow-ups. Frequency varies. Message
            and data rates may apply. You can reply <strong>STOP</strong> to
            opt out at any time, or <strong>HELP</strong> for assistance. We do
            not sell or share your mobile number with third parties for
            marketing.
          </p>

          <h2>5. How we share information</h2>
          <p>
            We only share your information when you authorize us to—for
            example, when you ask us to submit your information to a
            broker-dealer or RIA—or when required to operate our business
            (with vetted service providers) or comply with the law. We do not
            sell personal information.
          </p>

          <h2>6. Data security</h2>
          <p>
            We use commercially reasonable safeguards, including restricted
            internal access and secure systems. No method of transmission over
            the internet is 100% secure, but we work to protect information you
            share with us.
          </p>

          <h2>7. Your choices</h2>
          <p>
            You may contact us to request access to, correction of, or deletion
            of your personal information, subject to legal or contractual
            obligations.
          </p>

          <h2>8. Updates to this policy</h2>
          <p>
            We may update this policy from time to time. Material changes will
            be reflected in the effective date above.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call{" "}
            <span>{CONTACT_PHONE_DISPLAY}</span>.
          </p>
        </article>
      </Section>
    </>
  );
}
