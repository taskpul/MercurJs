"use client"

import { Card } from "@/components/atoms"
import { OrderProductListItem } from "@/components/cells"
import { CollapseIcon } from "@/icons"
import { convertToLocale } from "@/lib/helpers/money"
import { parcelStatuses, steps } from "@/lib/helpers/parcel-statuses"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export const ParcelAccordionItems = ({
  order,
  index,
  currency_code,
  shipping_total,
}: {
  order: any
  index: number
  currency_code: string
  shipping_total?: number
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight)
      }
    }, 100)
  }, [])

  const openHandler = () => {
    setIsOpen((prev) => !prev)
  }

  const status = parcelStatuses(order.fulfillment_status)

  const totalItems = order.items.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  )

  return (
    <Card key={order.id} className="border-b rounded-sm p-0">
      <div
        className="grid grid-cols-2 sm:grid-cols-7 cursor-pointer hover:bg-component-secondary/40 p-4 transition-all duration-300"
        onClick={openHandler}
      >
        <p className="label-md col-span-3">
          Order #{order.display_id}:{" "}
          <span className="text-primary font-semibold uppercase">
            {steps[status]}
          </span>
        </p>
        <p className="label-md col-span-2 px-2">
          Seller:{" "}
          <span className="text-primary font-semibold">
            {order.seller.name}
          </span>
        </p>
        {shipping_total && (
          <p className="label-md col-span-2 text-center px-2">
            Shipping:{" "}
            <span className="text-primary font-semibold">
              {convertToLocale({ amount: shipping_total, currency_code })}
            </span>
          </p>
        )}

        <div className="flex items-center gap-4 justify-end">
          <p className="label-md">
            {totalItems > 1 ? `${totalItems} Items` : `${totalItems} Item`}
          </p>
          <CollapseIcon
            size={20}
            className={cn(
              "transition-all duration-300 mt-0.5 flex-none",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </div>
      <div
        ref={contentRef}
        className={cn("transition-all duration-300 overflow-hidden")}
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
        }}
      >
        <div className="p-4">
          {order.items.map((item: any) => (
            <OrderProductListItem
              key={item.id + item.variant_id}
              item={item}
              currency_code={currency_code}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
