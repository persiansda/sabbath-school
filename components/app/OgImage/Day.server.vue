<script setup lang="ts">
import type { Day } from '~/types/day.type'
import type { Lesson } from '~/types/lesson.type'
import type { Quarterly } from '~/types/quarterly.type'

defineProps({
  path: String,
  title: String,
  description: String,
  day: Object as PropType<Day>,
  week: Object as PropType<Lesson>,
  quarterly: Object as PropType<Quarterly>,
})

const boxShadow = '0px 0px 17px rgba(0,0,0, 0.3)'
</script>

<template>
  <AppOgImageBase :quarterly="quarterly" :week="week" :day="day" :title="title" :description="description">
    <template #body>
      <img class="rounded" :src="week?.cover" :style="{ boxShadow, maxWidth: '100%', maxHeight: '270px', objectFit: 'cover' }">
    </template>
  </AppOgImageBase>
</template>
