import Vue from 'vue'

import './styles/quasar.styl'
// import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QExpansionItem,
  QCard,
  QCardSection,
  QRadio,
  QInput,
  QCheckbox,
  Dialog,
  QForm,
  QDialog,
  QCardActions,
  QToggle,
  QSelect
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QExpansionItem,
    QCard,
    QCardSection,
    QRadio,
    QInput,
    QCheckbox,
    QForm,
    QDialog,
    QCardActions,
    QToggle,
    QSelect
  },
  directives: {
  },
  plugins: {
    Dialog
  }
})