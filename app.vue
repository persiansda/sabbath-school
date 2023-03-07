<script lang="ts" setup>
const gradient = 'linear-gradient(to right, #2e5797, #3b82f6)'
</script>

<template>
  <Html :lang="$i18n.locale">
    <Body>
      <NuxtScrollIndicator :color="gradient" shadow="0px 0px 3px #2e5797" />
      <NuxtLoadingIndicator :color="gradient" />
      <!-- <VitePwaManifest /> -->
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* filter: blur(7px); */
}
</style>
