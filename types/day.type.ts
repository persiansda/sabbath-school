import type { Bible } from '~/types/bible.type'

export interface Day {
  id: string
  title: string
  date: string
  index: string
  bible: Bible[]
  content: string
}
