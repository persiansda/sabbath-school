<script lang="ts" setup>
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <button aria-label="Scroll To Top" class="fixed bottom-5 right-5 bg-ss-primary rounded-full p-1.5 z-50" @click="scrollToTop">
    <Icon name="mdi:chevron-up" class="text-white w-6" />
  </button>
</template>

<style lang="scss">

</style>
