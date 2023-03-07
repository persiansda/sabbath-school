<script lang="ts" setup>
const links = [
  {
    name: 'Google Play',
    icon: 'logos:google-play-icon',
    url: 'https://play.google.com/store/apps/details?id=com.cryart.sabbathschool',
  },
  {
    name: 'App Store',
    icon: 'logos:apple-app-store',
    url: 'https://apps.apple.com/us/app/sabbath-school/id895272167',
  },
]
</script>

<template>
  <footer class="w-full p-4 shadow md:flex md:items-center md:justify-between md:p-6">
    <span class="text-sm text-black sm:text-center mb-1">
      © {{ new Date().getFullYear() }}
      <NuxtLink href="https://adventech.io/" title="Adventech" class="hover:underline">Adventech</NuxtLink>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center justify-center mt-3 text-sm text-black sm:mt-0 mx-10">
      <li v-for="link in links" :key="link.url" class="mb-1">
        <NuxtLink :href="link.url" :title="link.name" class="mr-4 md:mr-6">
          <Icon :name="link.icon" class="h-6 w-6" />
        </NuxtLink>
      </li>
    </ul>
  </footer>
</template>
