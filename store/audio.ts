import { defineStore } from 'pinia'
import type { Audio } from '~/types/audio.type'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    audios: [] as Audio[],
    quarterly: '' as string,
  }),

  getters: {
    getWeekAudios(state) {
      return (target: string) => {
        return state.audios.filter((audio: Audio) => audio.target.startsWith(target))
      }
    },
    getFirstAudio(state) {
      return (target: string) => {
        return state.audios.find((audio: Audio) => audio.target === target)
      }
    },
  },

  actions: {
    async fetchAudios(quarterId: string) {
      const { locale } = useI18n()

      if (this.quarterly === locale.value + quarterId)
        return
      const { data } = await useApiFetch<Audio[]>(`/quarterlies/${quarterId}/audio.json`, {
        opts: {
          lazy: false,
        },
      })
      this.quarterly = locale.value + quarterId
      if (typeof (data.value) !== 'string' && data.value)
        this.audios = data.value
    },
  },
})
