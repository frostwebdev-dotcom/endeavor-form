import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-page">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:items-center focus:min-h-[44px] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:font-medium focus:shadow-card focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
