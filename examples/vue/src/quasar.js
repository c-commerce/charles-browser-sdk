import Vue from 'vue'

import './styles/quasar.scss'
import iconSet from 'quasar/icon-set/eva-icons.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
  },
  iconSet: iconSet
})
