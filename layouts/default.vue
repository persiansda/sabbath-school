<script lang="ts" setup>
const scrollPosition = ref<number>(0)

const handleScroll = () => scrollPosition.value = window.scrollY
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div class="container mx-auto px-5 lg:px-10 h-full">
    <!-- <AppPWA /> -->
    <AppHeader />

    <div :dir="$i18n.localeProperties.dir">
      <slot />
    </div>

    <Transition name="page">
      <AppScrollToTop v-if="scrollPosition > 87" />
    </Transition>
  </div>
</template>

<style lang="scss">
.ss-grid {
  @apply grid grid-cols-1 gap-y-14 sm:gap-x-24 md:gap-x-56 lg:gap-x-14 xl:gap-x-10 2xl:gap-x-7 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center md:justify-items-stretch;
}

html {
  scroll-behavior: smooth;
}

svg {
  height: 1.3rem;
  width: 1.3rem;
}

.dark-mode {
  body {
    // background: #00c7c7;
  }
}
</style>
