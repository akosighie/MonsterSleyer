import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate';
import VueResource from 'vue-resource'
import VueAlertify from 'vue-alertify';
import VueRouter from 'vue-router';
import routes from './routes.js';

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(VueAlertify, {
  

  glossary: {
    // dialogs default title
    title: 'Monster Slayer',
    // ok button text
    ok: 'Yes',
    // cancel button text
    cancel: 'Cancel',
  },

});

export const eventBus = new Vue();
new Vue({
  el: '#app',
  router,

  


  render: h => h(App)
})
