import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-sans antialiased min-h-screen bg-[#0a0a0f] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
