import './bootstrap';

import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import BootstrapVue from 'bootstrap-vue';

import router from '@/routes.js';

import App from '@/App.vue';

Vue.use(VueLocalStorage);
Vue.use(BootstrapVue);

window.onload = function () {
    window.Vue = new Vue({
        router,
        el: '#app',
        render: h => h(App)
    });
};
