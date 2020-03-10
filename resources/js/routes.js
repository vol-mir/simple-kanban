import Vue from 'vue';
import VueRouter from 'vue-router';

import DashboardLayout from '@/layout/DashboardLayout.vue';

import MainPage from '@pages/MainPage.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: DashboardLayout,
            redirect: '/main',
            children: [
                {
                    path: 'main',
                    name: 'mainPage',
                    component: MainPage
                }
            ]
        }
    ],
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
});

export default router;
