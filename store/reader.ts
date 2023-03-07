import { defineStore } from 'pinia'
import type { FontFamily } from '~/types/reader.type'

export const useReaderStore = defineStore('reader', {
  state: () => ({
    sidebar: true,
    options: {
      font: {
        size: 16,
        family: 'andada' as FontFamily,
      },
    },
  }),

  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
    setFontFamily(font: FontFamily) {
      this.options.font.family = font
    },
    setFontSize(size: number) {
      if (size >= 11 && size <= 27)
        this.options.font.size = size
    },
  },

  persist: true,
})
