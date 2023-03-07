<script lang="ts" setup>
import { useReaderStore } from '~/store/reader'
import { FontFamily } from '~/types/reader.type'

const { setFontSize, options, setFontFamily } = useReaderStore()
const colorMode = useColorMode()

const fonts = [
  {
    name: 'andada',
  },
  {
    name: 'lato',
  },
  {
    name: 'pt-serif',
  },
  {
    name: 'pt-sans',
  },
]

const modes = [
  {
    name: 'system',
    icon: 'uil:monitor',
  },
  {
    name: 'light',
    icon: 'uil:sun',
  },
  {
    name: 'sepia',
    icon: 'uil:coffee',
  },
  {
    name: 'dark',
    icon: 'uil:moon',
  },
]

function toggleTheme(mode: string) {
  colorMode.preference = mode
}
</script>

<template>
  <HeadlessMenu as="div" class="relative">
    <HeadlessMenuButton aria-label="Layout Settings">
      <Icon name="mdi:format-font" class="hover:text-blue-500 w-6 h-6 mr-4 text-white" />
    </HeadlessMenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <HeadlessMenuItems class="absolute right-0 mt-4 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div>
          <div class="flex border-b border-gray-100">
            <button v-for="mode in modes" :key="mode.name" :aria-label="`${mode.name} Mode`" :class="{ 'bg-gray-200': colorMode.preference === mode.name }" class="flex-grow text-gray-500 hover:text-black rounded-tl-md p-2 px-5 border-r border-gray-100" @click="toggleTheme(mode.name)">
              <Icon :name="mode.icon" />
              {{ mode.name }}
            </button>
          </div>

          <div class="flex border-b border-gray-100">
            <button v-for="font in fonts" :key="font.name" :ariaLabel="`${font.name} Font`" :class="{ 'bg-gray-50': false }" class="capitalize flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5" @click="setFontFamily(font.name as FontFamily)">
              {{ font.name.split('-').join(' ') }}
            </button>
          </div>

          <div class="flex px-3 py-3 items-center">
            <span class="text-gray-500 mr-2 text-xl select-none">
              <Icon name="mdi:format-font-size-decrease" />
            </span>
            <input
              v-model="options.font.size"
              type="range"
              min="11"
              max="27"
              step="1"
              class="flex-grow appearance-none cursor-pointer bg-gray-200 rounded-md h-2"
              @change.prevent="setFontSize(options.font.size)"
            >
            <span class="text-gray-500 ml-2 text-xl select-none">
              <Icon name="mdi:format-font-size-increase" />
            </span>
          </div>
        </div>
      </HeadlessMenuItems>
    </transition>
  </HeadlessMenu>
</template>

<style lang="scss">

</style>
