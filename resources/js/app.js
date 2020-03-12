import './bootstrap';
import './assets/style.css';

import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import VueFilterDateFormat from 'vue-filter-date-format';
import BootstrapVue from 'bootstrap-vue';
import VModal from 'vue-js-modal';

import router from '@/routes.js';
import store from '@modules/index.js';

import App from '@/App.vue';

Vue.use(VueLocalStorage);
Vue.use(BootstrapVue);
Vue.use(VueFilterDateFormat);
Vue.use(VModal);

window.onload = function () {
    window.Vue = new Vue({
        router,
        store,
        el: '#app',
        render: h => h(App)
    });
};
