import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, NavbarSearch } from "@/components/molecules"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="mx-auto flex w-full max-w-[1344px] border justify-between py-4 px-4 lg:px-8">
      <div className="hidden md:flex items-center">
        <CategoryNavbar categories={categories} />
      </div>

      <NavbarSearch />
    </div>
  )
}
