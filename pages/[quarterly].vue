<script lang="ts" setup>
import { useReaderStore } from '~/store/reader'
import type { ShowQuarterly } from '~/types/quarterly.type'

const readerStore = useReaderStore()
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()

const { data, pending } = await useApiFetch<ShowQuarterly>(`/quarterlies/${route.params.quarterly}/index.json`)

watchEffect(() => {
  if (!route.params.day) {
    if (!readerStore.sidebar)
      readerStore.toggleSidebar()
  }
})

useMeta({
  title: !pending.value ? data.value!.quarterly?.title ?? t('error.404.title') : 'Sabbath School',
  description: !pending.value ? wordSubstring(data.value!.quarterly?.description ?? t('error.404.message')) : t('app.description'),
  image: !pending.value ? data.value!.quarterly?.cover ?? '/assets/images/error.jpg' : '/assets/images/cover.jpg',
  imageAlt: !pending.value ? data.value!.quarterly?.title ?? t('error.404.title') : t('app.title'),
})
</script>

<template>
  <div>
    <SShimmerDetail v-if="pending" />
    <template v-else>
      <div v-if="data?.quarterly" class="my-10 md:flex">
        <div :class="{ hidden: !readerStore.sidebar }" class="shrink-0 flex justify-center md:justify-start md:flex-col md:items-end md:w-3/12 lg:w-3/12 xl:w-2/12">
          <div :class="{ 'md:text-left': $i18n.localeProperties.dir === 'ltr' }" class="sticky top-5 grid grid-cols-2 md:block w-11/12 md:w-auto ml-4 mr-3 md:ml-0">
            <div :class="{ 'mr-5': $i18n.localeProperties.dir === 'ltr' }">
              <NuxtLink :title="data.quarterly.title" :to="localePath({ name: 'quarterly', params: { quarterly: data.quarterly.id } })" class="w-4/12 mx-auto md:w-auto hover:underline">
                <SProImg :src="data.quarterly.cover" :alt="data.quarterly.title" :class="{ 'md:mr-4': $i18n.localeProperties.dir === 'ltr' }" class="w-40 rounded shadow-gray-400 shadow-md" />
                <span class="mt-4 font-bold text-lg text-gray-600 block w-3/4">
                  {{ data.quarterly.title }}
                </span>
              </NuxtLink>
              <div class="mt-2">
                <div v-for="feature in data.quarterly.features" :key="`quarterly_${data.quarterly.path}_feature_${feature.title}`" class="inline mr-3 last:mr-0">
                  <SProImg :src="feature.image" :alt="feature.name" class="w-4 inline" />
                </div>
              </div>
            </div>
            <div :class="{ 'md:text-left': $i18n.localeProperties.dir === 'ltr' }" class="md:mt-4 grid grid-cols-2 md:block">
              <div v-for="credit in data.quarterly.credits" :key="`quarterly_${data.quarterly.path}_credits_${credit.name}`" class="mb-4">
                <p class="font-bold">
                  {{ credit.name }}
                </p>
                <p class="text-gray-500">
                  {{ credit.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <NuxtPage :data="data" />
      </div>
      <SErrorNotFound v-else />
    </template>
  </div>
</template>

<style lang="scss">
.minimizer{
  position: fixed;
  z-index: 999;
  top: 10%;
  left: 2%;
  cursor: pointer;
}
</style>
