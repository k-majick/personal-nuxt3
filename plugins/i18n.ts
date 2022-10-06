import { createI18n } from 'vue-i18n'
import de from '../assets/i18n/de.json'
import en from '../assets/i18n/en.json'
import pl from '../assets/i18n/pl.json'
import { type RouteLocationNormalizedLoaded } from 'vue-router'

type Next = {
  [key: string]:
    | string
    | {
        [key: string]: string
      }
}

// type Translations = {
//   [key: string]: {
//     [key: string]: {
//       [key: string]: Record<string, unknown>
//     }
//   }
// }

// const translations: Translations = { de, en, pl }

export default defineNuxtPlugin(({ vueApp, $router }) => {
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

  $router.beforeEach(
    (to: RouteLocationNormalizedLoaded, _, next: (route?: Next) => void) => {
      console.dir("to.params.locale: " + to.params.locale) //eslint-disable-line

      if (!to.params.locale) {
        console.dir("set userLocale") //eslint-disable-line
        const userLocale = localStorage.getItem('user-locale') as string

        next({
          path: `/${userLocale ? userLocale : 'en'}/skills`,
          params: {
            locale: `${userLocale ? userLocale : 'en'}`,
          },
        })

        return
      }

      next()

      // const pageSlug = to.path.split('/').pop()
      // const pageSlugLocalized =
      //   translations[to.params.locale as keyof Translations].pages[
      //     pageSlug as keyof Record<string, unknown>
      //   ].slug

      // console.dir(to.path) //eslint-disable-line
      // console.dir(pageSlug) //eslint-disable-line
      // console.dir(pageSlugLocalized) //eslint-disable-line

    },
  )
})
