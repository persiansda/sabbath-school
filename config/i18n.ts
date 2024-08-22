import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import type { DateTimeFormats, NumberFormats, PluralizationRule } from '@intlify/core-base'
import { locales } from '../constants/locales'
import type { LocaleObject } from '#i18n'

export interface LocaleObjectData extends LocaleObject {
  native: string
  flag?: string
  file: string
  numberFormats?: NumberFormats
  dateTimeFormats?: DateTimeFormats
  pluralRule?: PluralizationRule
}

function buildLocales() {
  const useLocales = Object.values(locales).reduce((acc, data) => {
    acc.push(data)
    return acc
  }, <LocaleObjectData[]>[])
  return useLocales.sort((a, b) => a.code.localeCompare(b.code))
}

export const currentLocales = buildLocales()

export const i18n: NuxtI18nOptions = {
  locales: currentLocales,
  lazy: true,
  langDir: 'locales',
  defaultLocale: 'en',
  strategy: 'prefix_except_default',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'ss-locale',
    redirectOn: 'root',
  },
}
