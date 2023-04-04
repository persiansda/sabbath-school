import type { NitroFetchRequest } from 'nitropack'
import type { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'
import type { AsyncDataOptions, UseFetchOptions } from '#app'

interface ApiFetchOptions<T> {
  fetchOptions?: | UseFetchOptions<T extends void ? unknown : T, (res: T extends void ? unknown : T) => T extends void ? unknown : T, KeyOfRes<(res: T extends void ? unknown : T) => T extends void ? unknown : T>> | undefined
  opts?: AsyncDataOptions<T> | undefined
  excludeLocale?: boolean
}

export function useApiFetch<T>(
  request: NitroFetchRequest,
  options?: ApiFetchOptions<T>,
) {
  const runtimeConfig = useRuntimeConfig()
  const { locale } = useI18n()

  const reqKey = (options?.fetchOptions?.key ?? `${locale.value}:${request}`).replace('/', ':')

  return useAsyncData<T>(reqKey, () => $fetch(request, {
    baseURL: `${runtimeConfig.public.apiURL}/${locale.value}`,
    ...options?.fetchOptions as any,
  }), {
    lazy: true,
    ...options?.opts,
  })
}
