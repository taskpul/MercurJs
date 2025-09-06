import { Accordion } from "@/components/molecules"

const faqs = [
  {
    question: "What makes a commerce platform truly flexible?",
    answer:
      "A flexible platform offers modular architecture and open APIs so you can tailor every part of the commerce experience to your business needs.",
  },
  {
    question:
      "How is a flexible commerce platform more flexible than Shopify Plus, BigCommerce or Adobe Commerce?",
    answer:
      "Unlike rigid SaaS solutions, an open and modular setup lets you integrate any service and customize workflows without vendor lock‑in.",
  },
  {
    question: "Can a flexible commerce platform handle enterprise requirements?",
    answer:
      "Yes. With proper scaling strategies and extensible tooling, it can meet complex enterprise demands while remaining adaptable.",
  },
]

export function FAQSection() {
  return (
    <section className="bg-primary">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="label-lg mb-4 uppercase">FAQ</p>
            <h2 className="heading-lg mb-6 text-primary">
              Frequently Asked Questions about our flexible commerce platform
            </h2>
            <p className="text-secondary">
              Considering a switch from rigid SaaS platforms? Here&apos;s what technical teams and decision-makers need to know about implementing a truly flexible commerce platform that adapts to your business logic—not the other way around.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <Accordion key={faq.question} heading={faq.question} defaultOpen={false}>
                <p className="text-secondary">{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

