<script lang="ts" setup>
import type { QuarterlyTransformed } from '~/types/quarterly.type'

defineProps({
  quarterlies: {
    type: Array as PropType<QuarterlyTransformed[]>,
    required: true,
  },
})
</script>

<template>
  <Splide
    :options="{ perPage: 4, autoplay: true, breakpoints: { 640: { perPage: 1 } }, focus: 'center', pagination: false, navigation: false }"
  >
    <SplideSlide v-for="quarterly in quarterlies" :key="`q_${quarterly.id}`">
      <SCard :item="quarterly" />
    </SplideSlide>
  </Splide>
</template>

<style lang="scss">
.splide__slide  {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splide__arrows {
    display: none;
  }

@media (max-width: 640px) {
  .splide__slide {
    width: 100%;
    height: 100%;
  }
  .splide__arrows {
    display: block;
  }
}
</style>
