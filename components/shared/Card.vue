<script lang="ts" setup>
import type { QuarterlyTransformed } from '~/types/quarterly.type'

defineProps({
  item: {
    type: Object as PropType<QuarterlyTransformed>,
    required: true,
  },
})
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath({ name: 'quarterly', params: { quarterly: item.id } })"
    class="max-w-ss-cover"
  >
    <SProImg :src="item.cover" :alt="item.title" :height="355" class="min-w-ss-cover max-w-ss-cover max-h-ss-cover min-h-ss-cover object-cover object-top mb-4 rounded shadow-gray-400 shadow-lg" />
    <p class="mt-2 mb-2 text-xl font-bold">
      {{ item.title }}
    </p>
    <p class="uppercase text-gray-500 text-xs">
      {{ item.human_date }}
    </p>
  </NuxtLink>
</template>
