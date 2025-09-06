import { useParams } from "react-router-dom"
import { RouteFocusModal } from "../../../components/modals"
import {
  usePriceList,
  usePriceListProducts,
} from "../../../hooks/api/price-lists"
import { usePriceListCurrencyData } from "../common/hooks/use-price-list-currency-data"
import { PriceListPricesEditForm } from "./components/price-list-prices-edit-form"

export const PriceListPricesEdit = () => {
  const { id } = useParams()
  const { price_list, isLoading, isError, error } = usePriceList(id!)

  const {
    products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productError,
  } = usePriceListProducts(id!, {
    fields: "title,thumbnail,*variants,+status",
  })

  const { isReady, regions, currencies, pricePreferences } =
    usePriceListCurrencyData()

  const ready =
    !isLoading && !!price_list && !isProductsLoading && !!products && isReady

  if (isError) {
    throw error
  }

  if (isProductsError) {
    throw productError
  }

  return (
    <RouteFocusModal>
      <RouteFocusModal.Title asChild>
        <span className="sr-only">Edit Prices for {price_list?.title}</span>
      </RouteFocusModal.Title>
      <RouteFocusModal.Description className="sr-only">
        Update prices for products in the price list
      </RouteFocusModal.Description>
      {ready && (
        <PriceListPricesEditForm
          priceList={price_list}
          products={products}
          regions={regions}
          currencies={currencies}
          pricePreferences={pricePreferences}
        />
      )}
    </RouteFocusModal>
  )
}
