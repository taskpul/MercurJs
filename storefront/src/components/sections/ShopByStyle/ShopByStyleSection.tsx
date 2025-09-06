import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { Button } from "@/components/atoms"

export function ShopByStyleSection() {
  return (
    <section className="container bg-primary text-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col justify-center h-full py-12">
          <h2 className="display-sm mb-4">Guide: B2B Food Marketplace</h2>
          <p className="text-lg text-secondary mb-6 max-w-md">
            Read how you can build B2B Marketplace with Mercur. Explore the
            free ebook now.
          </p>
          <div className="flex gap-4">
            <LocalizedClientLink href="#">
              <Button size="large" className="w-fit">
                Download Guide
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="#">
              <Button size="large" variant="tonal" className="w-fit">
                Read online
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full">
          <Image
            loading="lazy"
            fetchPriority="high"
            src="/B2C_Storefront_Open_Graph.png"
            alt="B2B Food Marketplace guide preview"
            fill
            className="object-cover rounded-sm"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}
