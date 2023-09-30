<script lang="ts" setup>
import type { NuxtError } from '#app'

// prevent reactive update when clearing error
const { error } = defineProps<{
  error: Partial<NuxtError>
}>()

if (process.dev)
  console.error(error)
</script>

<template>
  <NuxtLayout>
    <slot>
      <SError :code="`${error.statusCode}`" :title="`${error.name}`" :message="error.message ?? 'Something went wrong'" />
    </slot>
  </NuxtLayout>
</template>
