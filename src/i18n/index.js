import { createI18n } from 'vue-i18n'
import zhHant from './zhHant.js'
import en from './en.js'
import jp from './jp.js'

// https://kazupon.github.io/vue-i18n/started.html#html
const i18n = createI18n({
  // something vue-i18n options here ...
  // locale預設的語言,偵測不到這個語言的話會用fallbacklocale
  locale: 'zhHant',
  fallbackLocale: 'zhHant',
  messages: {
    zhHant,
    en,
    jp,
  },
})

export default i18n
