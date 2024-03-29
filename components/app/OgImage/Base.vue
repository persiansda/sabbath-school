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

const textShadow = '0px 0px 13px rgba(0,0,0, 0.7)'
const boxShadow = '0px 0px 17px rgba(0,0,0, 0.3)'
const imgWhite = 'brightness(0) invert(1)'

const { localeProperties } = useI18n()
</script>

<template>
  <div dir="rtl" :style="{ backgroundImage: `linear-gradient(to bottom right, ${props.quarterly!.color_primary}, ${props.quarterly!.color_primary_dark})` }" class="relative w-full h-full flex items-center text-white border-2 border-white">
    <div :style="{ paddingTop: '100px', position: 'relative', width: '90%', paddingLeft: '350px' }">
      <div class="relative flex">
        <div :style="{ textShadow }" class="font-bold flex flex-row justify-between items-center text-3xl">
          {{ title }}
        </div>
        <p v-if="description" :style="{ fontSize: '17px', textShadow, direction: localeProperties.dir === 'rtl' ? 'rtl' : 'ltr', textAlign: localeProperties.dir === 'rtl' ? 'right' : 'left' }" class="text-gray-300" v-html="description" />
        <img v-if="week?.cover" class="rounded" :src="week.cover" :style="{ boxShadow, maxWidth: '100%', maxHeight: '270px', objectFit: 'cover' }">
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
