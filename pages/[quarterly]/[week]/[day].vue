<script lang="ts" setup>
import type { Quarterly } from '~/types/quarterly.type'
import type { Day } from '~/types/day.type'
import type { Pdf } from '~/types/pdf.type'

const props = defineProps({
  quarterly: {
    type: Object as PropType<Quarterly>,
    required: true,
  },
  week: {
    type: Object,
    required: true,
  },
  pdfs: {
    type: Array as PropType<Pdf[]>,
    required: false,
  },
  showPdf: {
    type: Boolean,
    required: false,
  },
})

const { t } = useI18n()
const route = useRoute()

const weekId = computed(() => route.params.week as string)

const { data: day, pending } = await useApiFetch<Day>(`/quarterlies/${route.params.quarterly}/lessons/${weekId.value}/days/${route.params.day}/read/index.json`)

// useMeta({
//   title: props.week?.title ?? t('error.404.title'),
//   description: wordSubstring(props.week?.title ?? t('error.404.message')),
//   image: props.week?.cover ?? '/assets/images/error.jpg',
//   imageAlt: props.week?.title ?? t('error.404.title'),
// })

useSeoMeta({
  titleTemplate: `%s | ${t('app.title')}`,
  title: props.week?.title ?? t('error.404.title'),
  description: wordSubstring(props.week?.title ?? t('error.404.message')),
})

defineOgImage({
  component: 'AppOgImageBase',
  path: route.path,
  quarterly: props.quarterly,
  week: props.week,
  day: day.value,
})
</script>

<template>
  <div class="grid">
    <SShimmerReader v-if="pending" />
    <div v-else>
      <SPdf v-if="(week.pdfOnly || showPdf) && pdfs?.length" :pdfs="pdfs" :lesson="weekId" />
      <SReader v-else-if="day?.id" :data="day" />
      <SErrorNotFound v-else :centered="false" />
    </div>
  </div>
</template>

<style lang="scss">

</style>
