import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import 'core-js/stable'; 
import 'regenerator-runtime/runtime';


// plugins
import vSelect from 'vue-select';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';
// import path from 'core-js/es';


// router
import Search from './pages/Search';
import Flight from './pages/Flight';


// Font awesome library, you need to register icon to library.add and import
// Ex 
// import { faArrowRight, faUserSecret } from '@fortawesome/free-solid-svg-icons'
// library.add(faArrowRight, faUserSecret)
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


// Vue.prototype.$http = axios
Vue.config.productionTip = false

// router configuration
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/', 
      name: 'Search',
      component: Search, 
      props: true

    },
    { 
      path: '/flights/:id', 
      name: 'Flights',
      component: Flight, 
      props: true
    },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
