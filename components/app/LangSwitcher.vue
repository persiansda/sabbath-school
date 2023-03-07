<script lang="ts" setup>
const { localeProperties } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath({ name: 'languages' })" class="hover:bg-gray-200 p-2 rounded flex items-center">
    <Icon name="mdi:translate" class="mr-2" />
    {{ localeProperties.native }}
    <Icon name="mdi:chevron-down" class="mr-2" />
  </NuxtLink>
</template>

<style lang="scss">

</style>
