import type { Feature } from '~/types/feature.type'
import type { Lesson } from '~/types/lesson.type'
import type { Credit } from '~/types/credit.type'
import type { Group } from '~/types/group.type'

export interface Quarterly {
  id: string
  title: string
  description: string
  human_date: string
  start_date: string
  end_date: string
  color_primary: string
  color_primary_dark: string
  splash: string
  credits: Credit[]
  lang: string
  index: string
  full_path: string
  path: string
  introduction: string
  features: Feature[]
  quarterly_group: Group
  cover: string
}

export interface QuarterlyWithGroup {
  name: string
  slug: string
  order: number
  total?: number
  quarterlies: QuarterlyTransformed[]
}

export interface QuarterlyTransformed {
  id: string
  title: string
  path: string
  cover: string
  human_date: string
}

export interface ShowQuarterly {
  quarterly: Quarterly
  lessons: Lesson[]
}
