import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BCard } from 'bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('b-card', BCard)
Vue.component('b-card-group', BCard)
Vue.component('b-card-text', BCard)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
