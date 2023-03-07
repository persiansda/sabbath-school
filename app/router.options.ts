import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  scrollBehavior(to) {
    const element = document.querySelector<HTMLElement>('#quarterlyWeek')
    if ((to.name as string)?.includes('quarterly-week-day'))
      return { top: element?.offsetTop ?? 100 }

    return { top: 0 }
  },
}
