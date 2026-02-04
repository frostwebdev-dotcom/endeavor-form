import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themeScript } from "./theme-script";

export const metadata: Metadata = {
  title: "Get In Touch | Endeavor Search Partners",
  description:
    "Request a meeting with Endeavor Search Partners. We'd love to hear from you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-surface-warm dark:bg-[#0a0a0f] text-zinc-800 dark:text-zinc-100 transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
