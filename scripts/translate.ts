import fs from 'fs-extra'
import translate from 'translate'
import { locales } from '~/constants/locales'
import { translations } from '~/constants/translations'
import type { Translation } from '~/constants/translations'

translate.engine = 'google'

async function translateValues(obj: Translation, locale: string): Promise<Translation> {
  const translated: Translation = {}

  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      try {
        const result = await translate(obj[key], locale)
        translated[key] = result.replace('|', '')
      }
      catch (e) {
        translated[key] = obj[key]
      }
    }

    else {
      try {
        translated[key] = await translateValues(obj[key] as Translation, locale)
      }
      catch (e) {
        translated[key] = obj[key]
      }
    }
  }

  return translated
}

async function main() {
  for (const locale of locales) {
    const translated = await translateValues(translations, locale.code)
    await fs.writeJSON(`locales/${locale.file}`, translated)
  }
}

main().catch(err => console.error(err))
