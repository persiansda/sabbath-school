import type { Lesson } from '~/types/lesson.type'
import type { Day } from '~/types/day.type'
import type { Pdf } from '~/types/pdf.type'

export interface Week {
  lesson: Lesson
  days: Day[]
  pdfs: Pdf[]
}
