<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<template>
  <header class="mt-3 md:flex w-full justify-between py-4 border-b items-center">
    <NuxtLink :to="localePath({ name: 'index' })" class="flex justify-center md:justify-start mb-2 md:mb-0">
      <img class="w-9 h-9 mr-3" src="/assets/images/logo.png" alt="Sabbath School">
      <p class="font-bold text-2xl">
        Sabbath School
      </p>
    </NuxtLink>

    <div class="flex justify-between">
      <AppLangSwitcher />

      <AppProfile />
    </div>
  </header>
</template>

<style lang="scss">

</style>
