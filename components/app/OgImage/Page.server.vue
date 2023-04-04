<script setup lang="ts">
import type { Quarterly } from '~/types/quarterly.type'

defineProps({
  path: String,
  title: String,
  description: String,
  quarterly: Object as PropType<Quarterly>,
})
</script>

<template>
  <AppOgImageBase :quarterly="quarterly" :title="`${quarterly?.id} | ${title}`" :description="description" />
</template>
