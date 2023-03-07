<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: null,
    required: false,
  },
})
</script>

<template>
  <img :src="src" :alt="alt" loading="lazy">
</template>

<style lang="scss" scoped>

</style>
