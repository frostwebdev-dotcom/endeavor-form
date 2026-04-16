import {
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { OFFICES } from "@/lib/content/offices";

export default function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_TEL,
      availableLanguage: ["English"],
    },
    location: OFFICES.map((o) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: o.city,
        addressRegion: o.region,
        addressCountry: "US",
      },
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organization, website]),
      }}
    />
  );
}
