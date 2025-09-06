import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@medusajs/ui"
import Head from "next/head"
import Script from "next/script"
import { retrieveTenant } from "@/lib/data/tenant"
import { hexToRgb } from "@/lib/helpers/hex-to-rgb"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant?: string }>
}): Promise<Metadata> {
  const { tenant } = await params
  const settings = tenant ? await retrieveTenant(tenant) : null

  const siteName =
    settings?.settings?.store_name ||
    process.env.NEXT_PUBLIC_SITE_NAME ||
    "Mercur B2C Demo - Marketplace Storefront"

  const description =
    settings?.settings?.store_description ||
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Mercur B2C Demo - Marketplace Storefront"

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  const icons = settings?.settings?.logo
    ? [{ url: settings.settings.logo }]
    : undefined

  return {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    description,
    metadataBase: new URL(base),
    alternates: {
      languages: {
        "x-default": base,
      },
    },
    ...(icons ? { icons: { icon: icons } } : {}),
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string; tenant?: string }>
}>) {
  const { locale, tenant } = await params
  const tenantData = tenant ? await retrieveTenant(tenant) : null

  const ALGOLIA_APP = process.env.NEXT_PUBLIC_ALGOLIA_ID
  const htmlLang = locale || "en"

  const primary = tenantData?.settings?.primary_color
  const secondary = tenantData?.settings?.secondary_color

  const style = primary || secondary
    ? `:root {${
        primary
          ? `--brand-900: ${hexToRgb(primary)}; --brand-800: ${hexToRgb(primary)}; --brand-700: ${hexToRgb(primary)}; --bg-action-primary: var(--brand-900); --content-action-primary: var(--brand-900); --border-action: var(--brand-900);`
          : ""
      }${secondary ? ` --bg-primary: ${hexToRgb(secondary)};` : ""} }`
    : undefined

  return (
    <html lang={htmlLang} className={poppins.variable}>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://i.imgur.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
        {ALGOLIA_APP && (
          <>
            <link
              rel="preconnect"
              href="https://algolia.net"
              crossOrigin="anonymous"
            />
            <link
              rel="preconnect"
              href="https://algolianet.com"
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href="https://algolia.net" />
            <link rel="dns-prefetch" href="https://algolianet.com" />
          </>
        )}
        {/* Image origins for faster LCP */}
        <link
          rel="preconnect"
          href="https://medusa-public-images.s3.eu-west-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://medusa-public-images.s3.eu-west-1.amazonaws.com"
        />
        <link
          rel="preconnect"
          href="https://mercur-connect.s3.eu-central-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://mercur-connect.s3.eu-central-1.amazonaws.com"
        />
        <link
          rel="preconnect"
          href="https://s3.eu-central-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://s3.eu-central-1.amazonaws.com" />
        <link
          rel="preconnect"
          href="https://api.mercurjs.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.mercurjs.com" />
        {style && <style>{style}</style>}
      </Head>
      <body className="font-sans antialiased bg-primary text-secondary relative">
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '578129907772466');fbq('track', 'PageView');",
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=578129907772466&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
