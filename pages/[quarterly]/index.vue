<script lang="ts" setup>
import DayJS from 'dayjs'
import DayJSIsBetween from 'dayjs/plugin/isBetween'
import type { ShowQuarterly } from '~/types/quarterly.type'

const props = defineProps({
  data: {
    type: Object as PropType<ShowQuarterly>,
    required: true,
  },
})

DayJS.extend(DayJSIsBetween)

const localePath = useLocalePath()
const { t } = useI18n()

const lessonTarget = computed(() => {
  if (props.data.lessons.length === 0)
    return null

  const now = DayJS().startOf('day')
  const lesson = props.data.lessons.find((x: any) => {
    const startDate = DayJS(x.start_date, 'DD/MM/YYYY').startOf('day')
    const endDate = DayJS(x.end_date, 'DD/MM/YYYY').endOf('day')
    return DayJS(now).isBetween(startDate, endDate, 'day')
  }) || props.data.lessons[0]

  return lesson
})

const openIntroduction = ref(false)
</script>

<template>
  <div class="mt-4 md:ml-8 md:mr-8 md:mt-0">
    <p class="mb-4 text-3xl font-bold">
      {{ data.quarterly.title }}
    </p>
    <!-- TODO: don't know what is this -->
    <!-- <a v-if="publishingInfo && publishingInfo.data" :href="publishingInfo.data.url" target="_blank" class="rounded p-4 bg-gray-100 hover:bg-gray-200 flex mb-4 justify-between items-center">
      <p class="text-gray-500 text-sm">{{ publishingInfo.data.message }}</p>
      <ChevronRightIcon class="shrink-0 ml-3 w-5 h-5 bg-ss-primary rounded-full text-white" />
    </a> -->
    <div class="mb-4">
      {{ data.quarterly.description }}
      <button v-if="data.quarterly.introduction && (Math.abs(data.quarterly.introduction.length - data.quarterly.description.length) > 100)" class="text-blue-600 font-medium italic underline outline-none" @click="openIntroduction = !openIntroduction">
        {{ $t('app.more') }}
      </button>
    </div>
    <SModal :open="openIntroduction" @close="openIntroduction = false">
      <SMarkdown :markdown="data.quarterly.introduction" />
    </SModal>
    <div v-if="lessonTarget">
      <NuxtLink :to="localePath({ name: 'quarterly-week-day', params: { quarterly: $route.params.quarterly as string, week: lessonTarget.id, day: '01' } })" class="rounded-full text-white px-6 tracking-wider text-xs font-bold uppercase py-2 bg-ss-primary active:bg-blue-500 hover:drop-shadow-lg ease-in duration-200">
        {{ $t('app.read') }}
      </NuxtLink>
    </div>
    <div class="mt-6 mb-4">
      <div v-for="week, index in data.lessons" :key="`${data.quarterly.path}-week-${index}`" class="mb-5 flex items-center">
        <span :class=" $i18n.localeProperties.dir === 'rtl' ? 'ml-4' : 'mr-4'" class="text-2xl font-bold text-gray-500">
          {{ index + 1 }}
        </span>
        <div>
          <NuxtLink :to="localePath({ name: 'quarterly-week-day', params: { quarterly: $route.params.quarterly as string, week: week.id, day: '01' } })" class="text-xl font-bold text-ss-primary hover:underline">
            {{ week.title }}
          </NuxtLink>
          <p class="text-gray-500 text-sm">
            {{ $dayjs(week.start_date, 'DD/MM/YYYY').format('MMM DD') }} - {{ $dayjs(week.end_date, 'DD/MM/YYYY').format('MMM DD') }}
          </p>
        </div>
      </div>
    </div>
    <div class="mb-4 grid grid-cols-2">
      <div v-for="feature in data.quarterly.features" :key="`${data.quarterly.path}-feature-${feature.name}`" class="mb-4">
        <div class="flex items-center">
          <SProImg :src="feature.image" :alt="feature.name" class="h-3 mr-2" />
          <p class="font-bold">
            {{ feature.title }}
          </p>
        </div>
        <p class="text-gray-500">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
