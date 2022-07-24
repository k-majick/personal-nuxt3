import { createI18n } from 'vue-i18n'
import de from '../assets/i18n/de.json'
import en from '../assets/i18n/en.json'
import pl from '../assets/i18n/pl.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      de,
      en,
      pl,
    },
  })

  vueApp.use(i18n)
})
