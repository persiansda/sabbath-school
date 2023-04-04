<script lang="ts" setup>
import { useAudioStore } from '~/store/audio'

const audioStore = useAudioStore()
const { locale } = useI18n()
const route = useRoute()

await audioStore.fetchAudios(route.params.quarterly as string)

const computedAudios = computed(() => audioStore.getWeekAudios(`${locale.value}/${route.params.quarterly}/${route.params.week}`))
const firstAudio = computed(() => audioStore.getFirstAudio(`${locale.value}/${route.params.quarterly}/${route.params.week}/${route.params.day}`))

const currentAudio = ref()
const playing = ref(false)

onMounted(() => {
  if (computedAudios.value.length)
    currentAudio.value = firstAudio.value ?? computedAudios.value[0]
})

function onEnded() {
  const index = computedAudios.value.findIndex(audio => audio.src === currentAudio.value.src)
  if (index < computedAudios.value.length - 1)
    currentAudio.value = computedAudios.value[index + 1]
}
</script>

<template>
  <div v-if="computedAudios.length" class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div v-if="currentAudio" class="relative">
      <img :src="currentAudio.image" class="object-cover w-full h-48">
      <div class="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
        <h3 class="font-bold">
          {{ currentAudio.title }}
        </h3>
        <span class="opacity-70">
          {{ currentAudio.artist }}
        </span>
      </div>
    </div>
    <ClientOnly>
      <SPlayer type="audio" class="w-3/12" :file="currentAudio" :autoplay="true" @play="playing = true" @pause="playing = false" @ended="onEnded" />
    </ClientOnly>

    <ul class="flex flex-col mt-4">
      <li v-for="audio in computedAudios" :key="audio.id" class="flex items-center justify-between p-3 hover:bg-gray-100 rounded hover:cursor-pointer" @click="currentAudio = audio">
        <div class="grow">
          <div class="font-bold">
            {{ audio.title }}
          </div>
          <div class="text-sm text-gray-400">
            {{ audio.artist }}
          </div>
        </div>
        <div v-if="currentAudio && currentAudio.src === audio.src && playing" class="shrink-0 stretch-0 relative h-4 rotate-180">
          <div class="flex">
            <div class="playing-icon playing-icon-slow ml-0.5 h-1 w-1 bg-ss-primary" />
            <div class="playing-icon playing-icon-medium ml-0.5 h-2 w-1 bg-ss-primary" />
            <div class="playing-icon playing-icon-fast ml-0.5 h-3 w-1 bg-ss-primary" />
          </div>
        </div>
      </li>
    </ul>
  </div>
  <SEmpty v-else />
</template>

<style lang="scss">

</style>
