const DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
const DEFAULT_LOCALE = 'en-US'

export const actualDate = () => {
  return new Date().toLocaleDateString(DEFAULT_LOCALE, DATE_OPTIONS)
}

export const buildDate = (date) => {
  return date.toLocaleDateString(DEFAULT_LOCALE, DATE_OPTIONS)
}
