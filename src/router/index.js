import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/NicePay',
        name: 'NicePay',
        component: () => import('../views/NicePay.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;