interface UseMetaOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
  imageAlt?: string
  site_name?: string
}

export function useMeta(options: UseMetaOptions) {
  const { locale, t } = useI18n()
  const route = useRoute().path
  const runtimeConfig = useRuntimeConfig()

  const url = `${runtimeConfig.public.baseURL}${route}`

  const metas = [
    {
      name: 'og:type',
      content: 'website',
    },
    {
      name: 'og:url',
      content: url,
    },
    {
      name: 'og:locale',
      content: locale.value,
    },
    {
      name: 'og:site_name',
      content: options.site_name ?? t('app.title'),
    },
    {
      name: 'twitter:site',
      content: options.site_name ?? t('app.title'),
    },
    {
      name: 'title',
      content: `${options.title} | ${t('app.title')}` ?? t('app.title'),
    },
    {
      name: 'og:title',
      content: `${options.title} | ${t('app.title')}` ?? t('app.title'),
    },
    {
      name: 'twitter:title',
      content: `${options.title} | ${t('app.title')}` ?? t('app.title'),
    },
    {
      name: 'description',
      content: options.description ?? t('app.description'),
    },
    {
      name: 'og:description',
      content: options.description ?? t('app.description'),
    },
    {
      name: 'twitter:description',
      content: options.description ?? t('app.description'),
    },
    {
      name: 'keywords',
      content: options.keywords ?? t('app.keywords'),
    },
    {
      name: 'og:image',
      content: options.image ?? '/assets/images/cover.jpg',
    },
    {
      name: 'og:image:alt',
      content: options?.imageAlt ?? options?.title ?? t('app.title'),
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: options.image ?? '/assets/images/cover.jpg',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
  ]

  return useHead({
    title: `${options.title} | ${t('app.title')}`,
    meta: metas.flat().filter(Boolean) as any,
  })
}
