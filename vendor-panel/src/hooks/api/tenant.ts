import { FetchError } from '@medusajs/js-sdk'
import { QueryKey, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { fetchQuery } from '../../lib/client'
import { queryClient } from '../../lib/query-client'

const TENANT_QUERY_KEY = 'tenant'

export const useTenant = (
  options?: UseQueryOptions<
    { tenant: any },
    FetchError,
    { tenant: any },
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => fetchQuery('/vendor/tenant', { method: 'GET' }),
    queryKey: [TENANT_QUERY_KEY],
    ...options
  })

  return { tenant: data?.tenant, ...rest }
}

export const useUpdateTenant = (
  options?: UseMutationOptions<
    { tenant: any },
    FetchError,
    Record<string, unknown>,
    QueryKey
  >
) => {
  return useMutation({
    mutationFn: (body) =>
      fetchQuery('/vendor/tenant', { method: 'POST', body }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [TENANT_QUERY_KEY] })
      options?.onSuccess?.(data, variables, context)
    },
    ...options
  })
}
