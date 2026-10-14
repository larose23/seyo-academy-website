import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "SEYO Academy | Youth soccer, education and mentorship in Toronto",
  description:
    "SEYO Academy is a non-profit youth soccer program in Etobicoke and York for ages 5 to 15, with tutoring and mentorship alongside weekly training.",
  openGraph: {
    title: "SEYO Academy",
    description: "Youth soccer, education and mentorship for ages 5 to 15 in Toronto.",
    images: ["/photos/huddle.jpg"],
  },
};

export const viewport = { themeColor: "#17406E" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Figtree:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
