import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

const NAV_LINKS = [
  { label: "About", path: "#" },
  { label: "Features", path: "#" },
  { label: "Contact", path: "#" },
  { label: "Docs", path: "#" },
  { label: "GitHub", path: "https://github.com/" },
]

const POLICY_LINKS = [
  { label: "Cookie Settings", path: "#" },
  { label: "Privacy Policy", path: "#" },
]

export function Footer({
  logo,
  storeName,
}: {
  logo?: string
  storeName?: string
}) {
  return (
    <footer className="border-t">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-y-6 py-8 md:flex-row">
          <div className="flex items-center gap-x-2">
            <Image
              src={logo || "/Logo.svg"}
              alt={`${storeName || "Mercur"} logo`}
              width={135}
              height={37}
              className="w-[110px] h-[30px] lg:w-[135px] lg:h-[37px]"
            />
            <span className="text-lg font-medium">{storeName || "Mercur"}</span>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map(({ label, path }) => (
              path.startsWith("http") ? (
                <a
                  key={label}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {label}
                </a>
              ) : (
                <LocalizedClientLink key={label} href={path} className="hover:underline">
                  {label}
                </LocalizedClientLink>
              )
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-y-4 border-t py-6 text-sm text-secondary md:flex-row">
          <p>© 2025 Elixir, All rights reserved.</p>
          <div className="flex gap-6">
            {POLICY_LINKS.map(({ label, path }) => (
              <LocalizedClientLink key={label} href={path} className="hover:underline">
                {label}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

