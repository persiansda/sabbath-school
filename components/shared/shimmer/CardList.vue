<template>
  <div class="mb-10 last:mb-10">
    <div class="mb-4 flex flex-col sm:flex-row justify-between items-center">
      <SShimmerText class="mt-2 mb-2" />
      <SShimmerText class="mt-2 mb-2 mr-5" />
    </div>
    <div class="ss-grid">
      <SShimmerCard v-for="item in 12" :key="item" />
    </div>
  </div>
</template>
