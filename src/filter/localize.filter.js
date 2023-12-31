import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
    'ru_RU': ru,
    'en_US': en
}
const  localize = {
    localizeFilter(key) {
        const locale = store.getters.info.locale || 'en_US'
        return locales[locale][key] || `[Localize error]: key ${key} not found`
    }
}
export default localize