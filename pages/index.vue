<script lang="ts" setup>
import type { Quarterly, QuarterlyWithGroup } from '~/types/quarterly.type'

const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()

const { data, pending, error } = useApiFetch<any>('/quarterlies/index.json', {
  fetchOptions: {
    // add cache key that every 3 months will change
    key: `quarterlies:index:${new Date().getFullYear()}-${Math.floor(new Date().getMonth() / 3 + 1)}`,
  },
  opts: {
    transform: (data: Quarterly[]) => {
      const groups: QuarterlyWithGroup[] = []

      data.forEach((quarterly: any) => {
        if (quarterly.quarterly_group) {
          if (!groups.find(group => group.name === quarterly.quarterly_group.name)) {
            groups.push({
              name: quarterly.quarterly_group.name,
              slug: slugify(quarterly.quarterly_group.name),
              order: quarterly.quarterly_group.order,
              quarterlies: [],
            })
          }
        }
        else {
          if (!groups.find(group => group.name === t('app.uncategorized'))) {
            groups.push({
              name: t('app.uncategorized'),
              slug: t('app.uncategorized'),
              order: 999,
              quarterlies: [],
            })
          }
        }
        if (quarterly.quarterly_group) {
          const group = groups.find(group => group.name === quarterly.quarterly_group.name)
          if (group) {
            group.quarterlies.push({
              id: quarterly.id,
              title: quarterly.title,
              path: quarterly.path,
              cover: quarterly.cover,
              human_date: quarterly.human_date,
            })
          }
        }
        else {
          const group = groups.find(group => group.name === t('app.uncategorized'))
          if (group) {
            group.quarterlies.push({
              id: quarterly.id,
              title: quarterly.title,
              path: quarterly.path,
              cover: quarterly.cover,
              human_date: quarterly.human_date,
            })
          }
        }
      })

      groups.sort((a, b) => a.order - b.order)

      return groups
    },
  },
})

const groups = computed<QuarterlyWithGroup[]>(() => {
  if (route.query.group)
    return [data.value?.find((group: QuarterlyWithGroup) => group.slug === route.query.group)]

  return data.value?.map((group: QuarterlyWithGroup) => ({
    ...group,
    total: group.quarterlies.length,
    quarterlies: group.slug === t('app.uncategorized') ? group.quarterlies : group.quarterlies.slice(0, 4),
  }))
})

const runtime = useRuntimeConfig()

useSeoMeta({
  description: t('app.description'),
  ogImage: `${runtime.public.baseURL}/assets/images/cover.jpg`,
  ogImageAlt: t('app.title'),
  twitterImage: `${runtime.public.baseURL}/assets/images/cover.jpg`,
  twitterImageAlt: t('app.title'),
  twitterDescription: t('app.description'),
})
</script>

<template>
  <div class="my-10">
    <SShimmerCardList v-if="pending" />
    <template v-else>
      <SError v-if="error" :redirect-path="null" :back="false" code="500" title="Something went wrong..." :message="error.message" />
      <template v-else>
        <div v-for="group in groups" :key="group.slug" class="mb-10 last:mb-10">
          <div class="mb-4 flex flex-col sm:flex-row justify-between items-center">
            <p class="text-sm font-bold uppercase text-ss-primary">
              {{ group.name }}
            </p>
            <template v-if="group.slug !== t('app.uncategorized')">
              <NuxtLink
                v-if="route.query.group"
                :to="localePath({ name: 'index' })"
                class="pl-2 pr-1 py-1.5 rounded hover:bg-ss-primary hover:text-white text-ss-primary flex items-center justify-between"
              >
                <Icon name="mdi:chevron-left" />
                <span class="text-sm">
                  {{ $t('app.back') }}
                </span>
              </NuxtLink>
              <NuxtLink
                v-else
                :to="localePath({ name: 'index', query: { group: group.slug } })"
                class="pl-2 pr-1 py-1.5 rounded hover:bg-ss-primary hover:text-white text-ss-primary flex items-center justify-between"
              >
                <span class="text-sm">{{ $t('app.all') }} ({{ group.total }})</span>
                <Icon name="mdi:chevron-right" />
              </NuxtLink>
            </template>
          </div>
          <div class="ss-grid">
            <SCard v-for="quarterly in group.quarterlies" :key="quarterly.path" :item="quarterly" />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss">
img.currentQuarterly {
  view-transition-name: selected-quarterly;
  contain: layout;
}
</style>
