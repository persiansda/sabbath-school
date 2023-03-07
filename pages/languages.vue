<script lang="ts" setup>
const { t, locales, locale: currentLocale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const query = ref<string>('')

const availableLocales = computed(() => {
  return locales.value.filter((locale: any) => {
    return locale.name.toLowerCase().includes(query.value.toLowerCase()) || locale.native.toLowerCase().includes(query.value.toLowerCase()) || locale.code.toLowerCase().includes(query.value.toLowerCase())
  })
})

useMeta({
  title: t('language.index'),
})
</script>

<template>
  <div class="mt-10" dir="ltr">
    <div class="flex justify-between">
      <NuxtLink :to="localePath({ name: 'index' })" class="flex items-center rounded hover:bg-ss-primary hover:text-white text-ss-primary pr-2 pl-1 py-1.5">
        <Icon name="mdi:chevron-left" class="shrink-0 mr-1" />
        <span>
          {{ $t('app.back') }}
        </span>
      </NuxtLink>
      <div class="md:w-1/3">
        <div class="relative">
          <input v-model="query" :dir="$i18n.localeProperties.dir" type="text" class="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-ss-primary focus:border-ss-primary" :placeholder="$t('language.search')">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon name="mdi:magnify" class="shrink-0" />
          </div>
        </div>
      </div>
    </div>

    <div class="my-10 grid grid-cols-2 lg:grid-cols-4 gap-1">
      <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)" :class="{ 'border-2 border-ss-primary': locale.code === currentLocale }" class="bg-white py-12 px-4 text-center hover:z-10 hover:relative hover:shadow-neutral-300 hover:shadow-2xl">
        <p class="font-bold text-2xl text-gray-500">
          {{ locale.native }}
        </p>
        <p class="mt-2 text-gray-300">
          {{ locale.name }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">

</style>
