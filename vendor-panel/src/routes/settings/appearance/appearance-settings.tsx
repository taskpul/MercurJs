import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, toast } from '@medusajs/ui'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useCallback } from 'react'

import { Form } from '../../../components/common/form'
import { SingleColumnPage } from '../../../components/layout/pages'
import { FileUpload, FileType } from '../../../components/common/file-upload'
import { uploadFilesQuery } from '../../../lib/client'
import { useTenant, useUpdateTenant } from '../../../hooks/api/tenant'
import { MediaSchema } from '../../products/product-create/constants'

const AppearanceSchema = z.object({
  primary_color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  secondary_color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).optional(),
  media: z.array(MediaSchema).optional()
})

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/heic',
  'image/svg+xml'
]

export const AppearanceSettings = () => {
  const { t } = useTranslation()
  const { tenant, isError, error } = useTenant()
  const { mutateAsync, isPending } = useUpdateTenant()

  const form = useForm<z.infer<typeof AppearanceSchema>>({
    resolver: zodResolver(AppearanceSchema),
    defaultValues: {
      primary_color: tenant?.primary_color || '#000000',
      secondary_color: tenant?.secondary_color || '#000000',
      media: []
    }
  })

  const { fields } = useFieldArray({ name: 'media', control: form.control, keyName: 'field_id' })

  if (isError) {
    throw error
  }

  const onUploaded = useCallback((files: FileType[]) => {
    form.setValue('media', files)
  }, [form])

  const handleSubmit = form.handleSubmit(async (values) => {
    let uploaded: any[] = []
    if (values.media?.length) {
      const uploadedResp = await uploadFilesQuery(values.media)
      uploaded = uploadedResp.files
    }
    await mutateAsync({
      primary_color: values.primary_color,
      secondary_color: values.secondary_color,
      logo: uploaded[0]?.url || tenant?.logo
    }, {
      onSuccess: () => toast.success(t('actions.save')),
      onError: (err) => toast.error(err.message)
    })
  })

  return (
    <SingleColumnPage>
      <Form {...form} onSubmit={handleSubmit} className='space-y-4'>
        <Form.Field name='media' control={form.control} render={() => (
          <Form.Item>
            <Form.Label optional>Logo</Form.Label>
            <Form.Control>
              <FileUpload uploadedImage={fields[0]?.url || tenant?.logo || ''} multiple={false} label={t('products.media.uploadImagesLabel')} hint={t('products.media.uploadImagesHint')} hasError={!!form.formState.errors.media} formats={SUPPORTED_FORMATS} onUploaded={onUploaded} />
            </Form.Control>
            <Form.ErrorMessage />
          </Form.Item>
        )} />
        <Form.Field name='primary_color' control={form.control} render={({ field }) => (
          <Form.Item>
            <Form.Label>Primary color</Form.Label>
            <Form.Control>
              <Input type='color' {...field} />
            </Form.Control>
            <Form.ErrorMessage />
          </Form.Item>
        )} />
        <Form.Field name='secondary_color' control={form.control} render={({ field }) => (
          <Form.Item>
            <Form.Label>Secondary color</Form.Label>
            <Form.Control>
              <Input type='color' {...field} />
            </Form.Control>
            <Form.ErrorMessage />
          </Form.Item>
        )} />
        <Button type='submit' isLoading={isPending}>{t('actions.save')}</Button>
      </Form>
    </SingleColumnPage>
  )
}
