import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos: [] as any[],
    quarterly: '' as string,
  }),

  getters: {
    hasVideo(state) {
      return state.videos.length > 0
    },
  },

  actions: {
    async fetchVideos(quarterId: string) {
      const { locale } = useI18n()
      if (this.quarterly === locale.value + quarterId)
        return
      const { data } = await useApiFetch<any>(`/quarterlies/${quarterId}/video.json`, {
        opts: {
          lazy: false,
        },
      })
      this.quarterly = locale.value + quarterId
      if (typeof (data.value) !== 'string' && data.value)
        this.videos = data.value
    },
  },
})
