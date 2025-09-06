import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea, toast } from '@medusajs/ui'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { Form } from '../../../components/common/form'
import { SingleColumnPage } from '../../../components/layout/pages'
import { useTenant, useUpdateTenant } from '../../../hooks/api/tenant'

const StoreSettingsSchema = z.object({
  store_name: z.string().min(1),
  store_description: z.string().optional()
})

export const StoreSettings = () => {
  const { t } = useTranslation()
  const { tenant, isError, error } = useTenant()
  const { mutateAsync, isPending } = useUpdateTenant()

  const form = useForm<z.infer<typeof StoreSettingsSchema>>({
    resolver: zodResolver(StoreSettingsSchema),
    defaultValues: {
      store_name: tenant?.settings?.store_name || '',
      store_description: tenant?.settings?.store_description || ''
    }
  })

  if (isError) {
    throw error
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values, {
      onSuccess: () => toast.success(t('actions.save')), 
      onError: (err) => toast.error(err.message)
    })
  })

  return (
    <SingleColumnPage>
      <Form {...form} onSubmit={handleSubmit} className='space-y-4'>
        <Form.Field name='store_name' control={form.control} render={({ field }) => (
          <Form.Item>
            <Form.Label>{t('fields.name')}</Form.Label>
            <Form.Control>
              <Input {...field} />
            </Form.Control>
            <Form.ErrorMessage />
          </Form.Item>
        )} />
        <Form.Field name='store_description' control={form.control} render={({ field }) => (
          <Form.Item>
            <Form.Label>{t('fields.description')}</Form.Label>
            <Form.Control>
              <Textarea {...field} />
            </Form.Control>
            <Form.ErrorMessage />
          </Form.Item>
        )} />
        <Button type='submit' isLoading={isPending}>{t('actions.save')}</Button>
      </Form>
    </SingleColumnPage>
  )
}
