import {
  CurrencyDollar,
  Puzzle,
  ServerStack,
  ShoppingBag,
  User,
  CogSixTooth,
} from "@medusajs/icons"

const moduleIcons = [
  ServerStack,
  Puzzle,
  ShoppingBag,
  CurrencyDollar,
  CogSixTooth,
  User,
]

const features = [
  {
    icon: ShoppingBag,
    title: "Cart",
    description: "Add to cart, checkout, and totals",
  },
  {
    icon: CurrencyDollar,
    title: "Payment",
    description: "Process any payment type",
  },
  {
    icon: User,
    title: "Customer",
    description: "B2C and B2B customer accounts",
  },
]

export const CommerceModulesSection = () => {
  return (
    <section className="w-full py-20 bg-neutral-50">
      <div className="container flex flex-col gap-16">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <p className="uppercase text-sm tracking-widest text-gray-500">
              Commerce Modules
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Modules covering all commerce domains
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {moduleIcons.map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow"
                >
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Pre-built commerce logic in composable modules. Adopt
              incrementally, compose as you want.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <p className="uppercase text-sm tracking-widest text-gray-500">
              Cart &amp; Purchase
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Checkout, total calculations, and more
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-4 bg-white rounded-md shadow"
              >
                <Icon className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommerceModulesSection
