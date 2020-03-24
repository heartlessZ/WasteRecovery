import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// Ready translated locale messages

const messages = {
  zh: require('../assets/lang/cn'),
  en: require('../assets/lang/en'),
}

let language = navigator.language;
language = language.substr(0, 2);
export default new VueI18n({
  locale: language, // set localenavigator
  messages, // set locale messages
})
