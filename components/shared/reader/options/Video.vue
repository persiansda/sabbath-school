<script lang="ts" setup>
import '@splidejs/vue-splide/css'
import { useVideoStore } from '~/store/video'

const videoStore = useVideoStore()
const route = useRoute()

await videoStore.fetchVideos(route.params.quarterly as string)

const currentVideo = ref()
const playing = ref(false)

onMounted(async () => {
  if (videoStore.videos.length && videoStore.videos[0].clips.length)
    currentVideo.value = videoStore.videos[0].clips[0]
})
</script>

<template>
  <div v-if="videoStore.videos.length">
    <div class="mb-4 min-h-96 relative">
      <ClientOnly>
        <SPlayer type="video" class="min-h-96" :file="currentVideo" @play="playing = true" @pause="playing = false" />
      </ClientOnly>
    </div>
    <div v-for="(artist, i) in videoStore.videos" :key="`video_artist_${i}`" class="mb-8">
      <p class="text-ss-primary uppercase font-bold text-sm mb-3">
        {{ artist.artist }}
      </p>
      <div class="">
        <Splide :options="{ fixedWidth: 194, gap: 10, pagination: false }">
          <SplideSlide v-for="clip in artist.clips" :key="`video_clip_${clip.id}`">
            <div class="cursor-pointer" @click="currentVideo = clip">
              <div :class="{ 'border-2 border-ss-primary': currentVideo && currentVideo.src === clip.src && playing }" :style="`background-image:url('${clip.thumbnail}')`" class="rounded h-24 w-48 bg-cover bg-center relative">
                <div v-if="currentVideo && currentVideo.src === clip.src && playing" class="absolute top-3 right-2 shrink-0 stretch-0 rotate-180 h-5">
                  <div class="flex">
                    <div class="playing-icon playing-icon-slow ml-0.5 h-1 w-1 bg-white" />
                    <div class="playing-icon playing-icon-medium ml-0.5 h-2 w-1 bg-white" />
                    <div class="playing-icon playing-icon-fast ml-0.5 h-3 w-1 bg-white" />
                  </div>
                </div>
              </div>
              <p class="mt-2 text-sm">
                {{ clip.title }}
              </p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
  <SErrorEmpty v-else />
</template>

<style lang="scss" scoped>

</style>
