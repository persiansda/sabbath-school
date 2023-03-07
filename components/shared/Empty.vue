<script  lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import EmptyAnimation from '~/assets/animations/empty.json'
import 'vue3-lottie/dist/style.css'
</script>

<template>
  <div>
    <Vue3Lottie :animation-data="EmptyAnimation" :height="300" />
  </div>
</template>
