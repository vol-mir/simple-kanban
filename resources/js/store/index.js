import Vue from 'vue';
import Vuex from 'vuex';

import tasks from '@modules/tasks.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        tasks: tasks
    }
});

export default store;
