import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  duration: 3000,
  position: 'top-right',
  closeOnSwipe: true,
  action: {
    text: 'Х',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})
