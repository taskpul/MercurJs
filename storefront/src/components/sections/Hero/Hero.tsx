import Link from "next/link"

type HeroProps = {
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

export const Hero = ({ heading, paragraph, buttons }: HeroProps) => {
  const baseButton = "px-6 py-3 rounded-sm font-medium transition-colors"
  const primaryButton =
    "bg-primary text-action hover:bg-action hover:text-tertiary"
  const secondaryButton =
    "border border-current text-tertiary hover:bg-primary hover:text-action"

  return (
    <section className="w-full bg-action py-24 text-tertiary">
      <div className="container flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
          {heading}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-tertiary/80">
          {paragraph}
        </p>
        {buttons.length > 0 && (
          <div className="flex gap-4 mt-4">
            {buttons.map(({ label, path }, i) => (
              <Link
                key={path}
                href={path}
                className={`${baseButton} ${
                  i === 0 ? primaryButton : secondaryButton
                }`}
                aria-label={label}
                title={label}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

