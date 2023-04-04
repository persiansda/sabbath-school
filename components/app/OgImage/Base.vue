<script setup lang="ts">
import type { Day } from '~/types/day.type'
import type { Lesson } from '~/types/lesson.type'
import type { Quarterly } from '~/types/quarterly.type'

const props = defineProps({
  path: String,
  title: String,
  description: {
    type: String,
    required: false,
  },
  quarterly: Object as PropType<Quarterly>,
  week: Object as PropType<Lesson>,
  day: Object as PropType<Day>,
})
const containerStyles = {
  padding: '10px 50px',
  backgroundImage: `linear-gradient(to bottom right, ${props.quarterly!.color_primary}, ${props.quarterly!.color_primary_dark})`,
}

const textShadow = '0px 0px 13px rgba(0,0,0, 0.7)'
const boxShadow = '0px 0px 17px rgba(0,0,0, 0.3)'
const imgWhite = 'brightness(0) invert(1)'
</script>

<template>
  <div :style="containerStyles" class="relative w-full h-full flex items-center text-white border-2 border-white">
    <div :style="{ paddingTop: '100px', position: 'relative', width: '80%', paddingLeft: '250px' }">
      <div class="relative flex">
        <div :style="{ textShadow }" class="font-bold flex flex-row justify-between items-center text-3xl">
          {{ title }}
        </div>
        <p v-if="description" :style="{ fontSize: '17px', lineHeight: '1.5em', textShadow }" class="text-gray-300" v-html="description" />
        <slot name="body" />
        <img class="rounded" :style="{ position: 'absolute', left: '-300px', boxShadow }" :src="quarterly?.cover" width="250">
      </div>
    </div>
    <div class="absolute bottom-0 left-5 right-5">
      <img :style="{ filter: imgWhite }" src="/assets/images/logo.png" width="100" height="100">
    </div>
    <div :style="{ textShadow, bottom: day ? '28px' : '38px', left: '125px' }" class="absolute">
      <span class="font-bold" style="font-size: 20px;">
        {{ quarterly?.human_date }}
      </span>
      <small v-if="day" style="opacity: 0.5;">
        {{ day?.date }}
      </small>
    </div>
    <div :style="{ bottom: '45px', right: '20px', display: 'flex' }" class="absolute">
      <img v-for="feature in quarterly?.features" :key="feature.name" :src="feature.image" :style="{ filter: imgWhite, margin: '0px 10px' }" width="20">
    </div>
    <div v-if="week" :style="{ top: '35px', right: '30px', display: 'flex' }" class="absolute font-bold">
      {{ week?.id }}
    </div>
    <div :style="{ top: '35px', left: '30px', display: 'flex' }" class="absolute font-bold">
      {{ quarterly?.lang.toUpperCase() }}
    </div>
  </div>
</template>
