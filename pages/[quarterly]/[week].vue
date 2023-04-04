<script lang="ts" setup>
import { useReaderStore } from '~/store/reader'
import type { Week } from '~/types/week.type'
import type { ShowQuarterly } from '~~/types/quarterly.type'

defineProps({
  data: {
    type: Object as PropType<ShowQuarterly>,
    required: true,
  },
})
const readerStore = useReaderStore()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

const weekId = computed(() => route.params.week as string)

const { data: week, pending } = await useApiFetch<Week>(`/quarterlies/${route.params.quarterly}/lessons/${weekId.value}/index.json`)

const currentWeek = computed<any>(() => week.value?.days.length
  ? {
      ...week.value?.days.find((day: any) => day.id === (route.params?.day ?? '01')),
      cover: week.value?.lesson.cover,
    }
  : week.value?.lesson)

const audioModal = ref(false)
const videoModal = ref(false)
const showPdf = ref(false)

onMounted(() => {
  if (!route.params?.day && week.value?.lesson)
    router.push(localePath({ name: 'quarterly-week-day', params: { quarterly: route.params.quarterly as string, week: weekId.value, day: '01' } }))
})
</script>

<template>
  <div class="md:flex grow">
    <SShimmerWeek v-if="pending" />
    <template v-else-if="week?.lesson">
      <div id="quarterlyWeek" :class="{ 'md:ml-6': readerStore.sidebar }" class="mt-4 md:mr-6 ml-0 md:mt-0 mb-4 md:mb-0 grow md:w-3/12 lg:w-9/12 xl:w-10/12">
        <div class="rounded border border-1 border-gray-150 h-full">
          <div :style="{ backgroundImage: `url(${week.lesson?.cover})` }" class="rounded-t h-ss-cover bg-center bg-cover flex flex-col">
            <div class="flex justify-end p-2" dir="ltr">
              <div class="py-3 px-5 bg-black/[.6] flex rounded-lg">
                <button aria-label="Sidebar" @click="readerStore.toggleSidebar">
                  <Icon :name="readerStore.sidebar ? 'tabler:layout-sidebar-left-collapse' : 'tabler:layout-sidebar-left-expand'" :class="{ 'mr-4': !week.lesson.pdfOnly }" class="hover:text-blue-500 w-6 h-6 text-white" />
                </button>

                <template v-if="!week.lesson.pdfOnly ">
                  <SReaderOptionsLayout />

                  <button aria-label="Audio" @click="audioModal = true">
                    <Icon name="mdi:headphones" class="hover:text-blue-500 w-6 h-6 mr-4 text-white" />
                  </button>
                  <SModal :open="audioModal" name="Audio" @close="audioModal = false">
                    <SReaderOptionsAudio />
                  </SModal>

                  <button aria-label="Video" @click="videoModal = true">
                    <Icon name="mdi:youtube-tv" :class="{ 'mr-4': week.pdfs.length > 0 }" class="hover:text-blue-500 w-6 h-6 text-white" />
                  </button>
                  <SModal :open="videoModal" name="Video" @close="videoModal = false">
                    <SReaderOptionsVideo />
                  </SModal>
                  <button v-if="week.pdfs.length" aria-label="PDF" @click="showPdf = !showPdf">
                    <Icon name="mdi:file-pdf-outline" :class="[showPdf ? 'text-blue-500' : 'text-white']" class="hover:text-blue-500 w-6 h-6" />
                  </button>
                </template>
              </div>
            </div>
            <div class="grow" />
            <div v-if="currentWeek" class="bg-gradient-to-b from-transparent to-black w-full py-5 px-4 md:px-6 lg:px-8 xl:px-10">
              <p v-if="currentWeek?.date" class="text-gray-300 uppercase font-thin">
                {{ $dayjs(currentWeek.date ?? currentWeek.start_date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}
              </p>
              <p class="text-white font-bold text-4xl">
                {{ currentWeek.title }}
              </p>
            </div>
          </div>
          <NuxtPage :week="currentWeek" :show-pdf="showPdf" :pdfs="week.pdfs" />
        </div>
      </div>
      <div class="shrink-0 flex justify-center md:justify-start md:flex-col md:items-end md:w-3/12 lg:w-3/12 xl:w-2/12">
        <div class="md:block grid grid-cols-3 md:text-right ss-sidebar-sticky">
          <template v-if="!week.lesson.pdfOnly">
            <NuxtLink v-for="item in week.days" :key="item.id" :to="localePath({ name: 'quarterly-week-day', params: { quarterly: route.params.quarterly as string, week: weekId, day: item.id } })" class="flex flex-col hover:bg-gray-200 px-4 py-2 rounded justify-center">
              <p class="text-sm text-gray-500">
                {{ $dayjs(item.date, 'DD/MM/YYYY').format('ddd, MMMM DD') }}
              </p>
              <span class="text-sm block" :class="{ 'text-ss-primary font-bold': $route.params.day === item.id }">
                {{ item.title }}
              </span>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink
              v-for="item, index in data.lessons" :key="item.id"
              :to="localePath({ name: 'quarterly-week-day', params: { quarterly: route.params.quarterly as string, week: item.id as string, day: '01' } })"
              class="mb-1 flex items-center md:justify-end hover:bg-gray-200 px-2 py-2 rounded"
              :class="$route.params.week === item.id ? 'font-bold text-ss-primary' : 'text-gray-600'"
            >
              <span class="stretchgrow overflow-hidden text-sm order-2 md:order-1">
                {{ item.title }}
              </span>
              <div :class="$route.params.week === item.id ? 'bg-ss-primary text-white' : 'bg-gray-400'" class="order-1 shrink-0 text-gray-100 inline-flex rounded-full w-5 h-5 justify-center items-center mr-3 ml-3">
                <span class="text-xs text-center">{{ index + 1 }}</span>
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </template>
    <SErrorNotFound v-else />
  </div>
</template>

<style lang="scss">
.ss-sidebar-sticky {
  position: sticky;
  top: 1rem;
  overflow: auto;
  padding-bottom: 10px;
  height: calc(100vh - 1rem);

  @media (max-width: 768px) {
    position: relative;
    height: auto;
    padding: 0;
  }

  &:hover {
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;

    }
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 7px;
    transition: all 0.3s ease;

    &:hover {
      background: #555;
    }
  }
}
</style>
