import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"

export const BannerSection = () => {
  return (
    <section className="container bg-primary text-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] w-full">
          <Image
            loading="lazy"
            fetchPriority="high"
            src="/images/banner-section/Image.jpg"
            alt="Marketplace case study screenshot"
            width={700}
            height={600}
            className="object-cover rounded-sm"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center h-full">
          <Image
            src="/Logo.png"
            alt="Notup logo"
            width={120}
            height={40}
            className="mb-4 w-auto h-auto"
          />
          <h2 className="display-sm mb-4">
            Custom Marketplace built in 9 Weeks
          </h2>
          <p className="text-lg text-secondary mb-6 max-w-md">
            Notup is a rising star in the DACH marketplace for local products,
            migrating from Storefront to a customizable Mercur Marketplace
            Platform.
          </p>
          <div className="flex gap-8 mb-8">
            <div>
              <p className="heading-xl">1000+</p>
              <p className="text-sm uppercase text-secondary">Products</p>
            </div>
            <div>
              <p className="heading-xl">150+</p>
              <p className="text-sm uppercase text-secondary">Vendors</p>
            </div>
          </div>
          <LocalizedClientLink href="#">
            <Button size="large" className="w-fit">
              Explore Case Study
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
