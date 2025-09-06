"use client"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema, AddressFormData } from "./schema"
import { LabeledInput } from "@/components/cells"
import { Button } from "@/components/atoms"
import { addCustomerAddress, updateCustomerAddress } from "@/lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@/components/cells/CountrySelect/CountrySelect"
import { useState } from "react"

interface Props {
  defaultValues?: AddressFormData

  regions: HttpTypes.StoreRegion[]
  handleClose?: () => void
}

export const emptyDefaultAddressValues = {
  addressName: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  countryCode: "",
  postalCode: "",
  company: "",
  province: "",
  phone: "",
  metadata: {},
}

export const AddressForm: React.FC<Props> = ({ defaultValues, ...props }) => {
  const methods = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || emptyDefaultAddressValues,
  })

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  )
}

const Form: React.FC<Props> = ({ regions, handleClose }) => {
  const [error, setError] = useState<string>()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useFormContext()

  const region = {
    countries: regions.flatMap((region) => region.countries),
  }

  const submit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append("addressId", data.addressId || "")
    formData.append("address_name", data.addressName)
    formData.append("first_name", data.firstName)
    formData.append("last_name", data.lastName)
    formData.append("address_1", data.address)
    formData.append("address_2", "")
    formData.append("province", data.province)
    formData.append("city", data.city)
    formData.append("country_code", data.countryCode)
    formData.append("postal_code", data.postalCode)
    formData.append("company", data.company)
    formData.append("phone", data.phone)

    const res = data.addressId
      ? await updateCustomerAddress(formData)
      : await addCustomerAddress(formData)

    if (!res.success) {
      setError(res.error)
      return
    }

    setError("")
    handleClose && handleClose()
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="px-4 space-y-4">
        <div className="max-w-full grid grid-cols-2 items-top gap-4 mb-4">
          <LabeledInput
            label="Address name"
            placeholder="Type address name"
            className="col-span-2"
            error={errors.firstName as FieldError}
            {...register("addressName")}
          />
          <LabeledInput
            label="First name"
            placeholder="Type first name"
            error={errors.firstName as FieldError}
            {...register("firstName")}
          />
          <LabeledInput
            label="Last name"
            placeholder="Type last name"
            error={errors.firstName as FieldError}
            {...register("lastName")}
          />
          <LabeledInput
            label="Company (optional)"
            placeholder="Type company"
            error={errors.company as FieldError}
            {...register("company")}
          />
          <LabeledInput
            label="Address"
            placeholder="Type address"
            error={errors.address as FieldError}
            {...register("address")}
          />
          <LabeledInput
            label="City"
            placeholder="Type city"
            error={errors.city as FieldError}
            {...register("city")}
          />
          <LabeledInput
            label="Postal code"
            placeholder="Type postal code"
            error={errors.postalCode as FieldError}
            {...register("postalCode")}
          />
          <LabeledInput
            label="State / Province"
            placeholder="Type state / province"
            error={errors.province as FieldError}
            {...register("province")}
          />
          <div>
            <CountrySelect
              region={region as HttpTypes.StoreRegion}
              {...register("countryCode")}
              value={watch("countryCode")}
              className="h-12"
            />
            {errors.countryCode && (
              <p className="label-sm text-negative">
                {(errors.countryCode as FieldError).message}
              </p>
            )}
          </div>

          <LabeledInput
            label="Phone"
            placeholder="Type phone number"
            error={errors.phone as FieldError}
            {...register("phone")}
          />
        </div>
        {error && <p className="label-md text-negative">{error}</p>}
        <Button className="w-full ">Save address</Button>
      </div>
    </form>
  )
}
