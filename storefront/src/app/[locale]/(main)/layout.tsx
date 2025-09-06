import { Footer, Header } from "@/components/organisms"
import { FAQSection } from "@/components/sections"
import { retrieveCustomer } from "@/lib/data/customer"
import { checkRegion } from "@/lib/helpers/check-region"
import { retrieveTenant } from "@/lib/data/tenant"
import { Session } from "@talkjs/react"
import { redirect } from "next/navigation"

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string; tenant?: string }>
}>) {
  const APP_ID = process.env.NEXT_PUBLIC_TALKJS_APP_ID
  const { locale, tenant } = await params

  const user = await retrieveCustomer()
  const regionCheck = await checkRegion(locale)
  const tenantData = tenant ? await retrieveTenant(tenant) : null
  const logo = tenantData?.settings?.logo
  const storeName = tenantData?.settings?.store_name

  if (!regionCheck) {
    return redirect("/")
  }

  if (!APP_ID || !user)
    return (
      <>
        <Header logo={logo} />
        {children}
        <FAQSection />
        <Footer logo={logo} storeName={storeName} />
      </>
    )

  return (
    <>
      <Session appId={APP_ID} userId={user.id}>
        <Header logo={logo} />
        {children}
        <FAQSection />
        <Footer logo={logo} storeName={storeName} />
      </Session>
    </>
  )
}
