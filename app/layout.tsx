import type React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
  preload: true,
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
  preload: true,
});

// Base URL for your site
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://thecakepanier.com";

export const metadata: Metadata = {
  // Basic SEO
  title: {
    default: "The Cake Panier - Artisanal Baked Goods & Fresh Pastries",
    template: "%s | The Cake Panier",
  },
  description:
    "Experience the taste of home-baked goodness with our artisanal breads, pastries, and desserts made fresh daily. Premium bakery serving handcrafted cakes, croissants, and specialty baked goods.",

  // Enhanced SEO
  keywords: [
    "artisanal bakery",
    "fresh pastries",
    "handcrafted cakes",
    "daily baked goods",
    "premium bread",
    "desserts",
    "croissants",
    "specialty baking",
    "home-baked",
    "gourmet pastries",
  ],

  authors: [{ name: "The Cake Panier" }],
  creator: "The Cake Panier",
  publisher: "The Cake Panier",

  // Technical SEO
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "The Cake Panier",
    title: "The Cake Panier - Artisanal Baked Goods & Fresh Pastries",
    description:
      "Experience the taste of home-baked goodness with our artisanal breads, pastries, and desserts made fresh daily. Premium bakery serving handcrafted cakes, croissants, and specialty baked goods.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "The Cake Panier - Fresh artisanal baked goods and pastries",
      },
      {
        url: "/og-image-square.jpg", // Square version (1:1 ratio)
        width: 1200,
        height: 1200,
        alt: "The Cake Panier bakery logo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@thecakepanier", // Replace with your actual Twitter handle
    creator: "@thecakepanier",
    title: "The Cake Panier - Artisanal Baked Goods & Fresh Pastries",
    description:
      "Experience the taste of home-baked goodness with our artisanal breads, pastries, and desserts made fresh daily.",
    images: ["/twitter-image.jpg"], // 1200x600px recommended
  },

  // Additional social media
  other: {
    "fb:app_id": "your_facebook_app_id", // Replace with actual Facebook App ID if you have one
  },

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your actual verification codes)
  verification: {
    google: "your_google_verification_code",
    yandex: "your_yandex_verification_code",
    yahoo: "your_yahoo_verification_code",
    other: {
      me: ["your_domain@email.com"],
    },
  },

  // App-specific
  category: "food",
  classification: "bakery",

  // Structured data will be added via JSON-LD in the body
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for local business
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Bakery",
        "@id": `${baseUrl}/#bakery`,
        name: "The Cake Panier",
        description:
          "Artisanal bakery specializing in fresh daily baked goods, pastries, breads, and desserts",
        url: baseUrl,
        telephone: "+1-XXX-XXX-XXXX", // Replace with actual phone
        email: "info@thecakepanier.com", // Replace with actual email
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Bakery Street", // Replace with actual address
          addressLocality: "Your City",
          addressRegion: "Your State",
          postalCode: "12345",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "40.7128", // Replace with actual coordinates
          longitude: "-74.0060",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:00",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday", "Sunday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        servesCuisine: "Bakery",
        priceRange: "$$",
        image: `${baseUrl}/bakery-storefront.jpg`, // Replace with actual image
        sameAs: [
          "https://www.facebook.com/thecakepanier", // Replace with actual social links
          "https://www.instagram.com/thecakepanier",
          "https://twitter.com/thecakepanier",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "The Cake Panier",
        description:
          "Artisanal bakery website featuring fresh baked goods, pastries, and desserts",
        publisher: {
          "@id": `${baseUrl}/#bakery`,
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "The Cake Panier",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          url: `${baseUrl}/logo.png`, // Replace with actual logo
          width: 512,
          height: 512,
          caption: "The Cake Panier Logo",
        },
        image: {
          "@id": `${baseUrl}/#logo`,
        },
        sameAs: [
          "https://www.facebook.com/thecakepanier",
          "https://www.instagram.com/thecakepanier",
          "https://twitter.com/thecakepanier",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} antialiased`}
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8B4513" />{" "}
        {/* Replace with your brand color */}
        <meta name="msapplication-TileColor" content="#8B4513" />
        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Breadcrumb structured data will be added by individual pages */}
      </head>
      <body className="font-sans">\
        
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
