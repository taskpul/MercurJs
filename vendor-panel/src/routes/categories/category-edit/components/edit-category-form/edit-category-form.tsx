import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Textarea, toast } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { HttpTypes } from "@medusajs/types"
import { Form } from "../../../../../components/common/form"
import { HandleInput } from "../../../../../components/inputs/handle-input"
import { RouteDrawer, useRouteModal } from "../../../../../components/modals"
import { KeyboundForm } from "../../../../../components/utilities/keybound-form"
import { useUpdateProductCategory } from "../../../../../hooks/api/categories"
import { useUpdateRequest } from "../../../../../hooks/api"

const EditCategorySchema = z.object({
  name: z.string().min(1),
  handle: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  visibility: z.enum(["public", "internal"]),
})

type EditCategoryFormProps = {
  category: HttpTypes.AdminProductCategory
  requestId: string
}

export const EditCategoryForm = ({
  category,
  requestId,
}: EditCategoryFormProps) => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()

  const form = useForm<z.infer<typeof EditCategorySchema>>({
    defaultValues: {
      name: category.name,
      handle: category.handle,
      description: category.description || "",
      status: category.is_active ? "active" : "inactive",
      visibility: category.is_internal ? "internal" : "public",
    },
    resolver: zodResolver(EditCategorySchema),
  })

  const { mutateAsync, isPending } = useUpdateRequest(requestId)
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        request: {
          type: "product_category",
          data: {
            name: data.name,
            handle: data.handle,
          },
        },
      },
      {
        onSuccess: () => {
          toast.success(t("categories.edit.successToast"))
          handleSuccess()
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  })

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <RouteDrawer.Body>
          <div className="flex flex-col gap-y-4">
            <Form.Field
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label>{t("fields.title")}</Form.Label>
                    <Form.Control>
                      <Input autoComplete="off" {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )
              }}
            />
            <Form.Field
              control={form.control}
              name="handle"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label
                      optional
                      tooltip={t("collections.handleTooltip")}
                    >
                      {t("fields.handle")}
                    </Form.Label>
                    <Form.Control>
                      <HandleInput {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )
              }}
            />
            <Form.Field
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label optional>{t("fields.description")}</Form.Label>
                    <Form.Control>
                      <Textarea {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )
              }}
            />
          </div>
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button size="small" type="submit" isLoading={isPending}>
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  )
}
