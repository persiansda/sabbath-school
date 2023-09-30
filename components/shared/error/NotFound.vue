<script lang="ts" setup>
defineProps({
  centered: {
    type: Boolean,
    default: true,
    required: false,
  },
})
</script>

<template>
  <SError :centered="centered" code="404" :title="$t('error.404.title')" :message="$t('error.404.message')" />
</template>
