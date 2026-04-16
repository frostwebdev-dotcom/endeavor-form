import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Endeavor Search Partners website.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms-of-service" },
        ]}
      />
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        lead="Please read these terms carefully. By using this website, you agree to them."
      />
      <Section tone="paper" narrow>
        <article className="legal max-w-readable text-slate-800">
          <p>
            <strong>Effective date:</strong> January 1, 2026
          </p>

          <h2>1. Acceptance of terms</h2>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) apply to your access
            to and use of websites, content, and services provided by Endeavor
            S.P., Inc. (&ldquo;Endeavor Search Partners,&rdquo;
            &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By
            accessing or using this site, you agree to these Terms. If you do
            not agree, please do not use the site.
          </p>

          <h2>2. Informational purposes only</h2>
          <p>
            The content on this site is provided for general informational
            purposes. It does not constitute legal, tax, investment, or
            employment advice, and it does not create a client relationship
            between you and us. You should consult appropriate professionals
            before making decisions based on information you find here.
          </p>

          <h2>3. No offer of securities</h2>
          <p>
            Nothing on this site is an offer to buy or sell securities, or an
            invitation to engage in any investment activity. Endeavor Search
            Partners is a recruiting and consulting firm; we do not provide
            investment advice.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            All content, trademarks, and design on this site are owned by or
            licensed to Endeavor S.P., Inc. You may not copy, modify,
            distribute, or create derivative works without our prior written
            permission, other than for your own personal, non-commercial
            reference.
          </p>

          <h2>5. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the site in a way that violates applicable law or these Terms</li>
            <li>Attempt to gain unauthorized access to any part of the site</li>
            <li>Interfere with the proper operation of the site or our services</li>
            <li>Use automated tools to scrape content without our consent</li>
          </ul>

          <h2>6. Third-party links</h2>
          <p>
            Our site may contain links to third-party websites. We do not
            control or endorse those sites and are not responsible for their
            content or practices. Visiting a third-party site is at your own
            risk.
          </p>

          <h2>7. Disclaimer of warranties</h2>
          <p>
            The site is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis. To the fullest extent permitted by law,
            we disclaim all warranties, express or implied, including
            merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Endeavor S.P., Inc. and
            its affiliates will not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of or in
            connection with your use of the site.
          </p>

          <h2>9. Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. Material changes will
            be reflected in the effective date above. Continued use of the
            site after updates means you accept the revised Terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </article>
      </Section>
    </>
  );
}
