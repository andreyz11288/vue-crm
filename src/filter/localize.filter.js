import store from '../store'
import ua from '../locales/ua.json'
import en from '../locales/en.json'

const locales = {
    'uk_UA': ua,
    'en_US': en
}
const  localize = {
    localizeFilter(key) {
        const locale = store.getters.info.locale || 'en_US'
        return locales[locale][key] || `[Localize error]: key ${key} not found`
    }
}
export default localize