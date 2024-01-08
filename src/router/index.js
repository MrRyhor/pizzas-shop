import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage/MainPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { isAuthenticated } from './helpers'

const routes = [
    {
        path: '/',
        name: 'main',
        meta: {
            requireAuth: false,
        },
        component: MainPage,
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            requireAuth: false,
        },
        component: LoginPage,
    },
    {
        path: '/contacts',
        name: 'contacts',
        meta: {
            requireAuth: false,
        },
        component: () => import('../views/ContactsPage.vue'),
    },
    {
        path: '/users',
        name: 'users',
        meta: {
            requireAuth: true,
        },
        component: () => import('../views/UserPage/UserPage.vue'),
    },
    {
        path: '/orders',
        name: 'orders',
        meta: {
            requireAuth: true,
        },
        component: () => import('../views/OrdersPage/OrdersPage.vue'),
    },
    {
        path: '/pizzas',
        children: [
            {
                path: '',
                name: 'pizzas',
                meta: {
                    requireAuth: false,
                },
                component: () => import('../views/PizzasView/PizzasView.vue'),
            },
            {
                path: '/config/:id?',
                name: 'pizzas-config',
                meta: {
                    requireAuth: true,
                },
                component: () => import('../views/PizzasView/PizzaEditor.vue'),
            },
        ],
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {
            requireAuth: true,
        },
        component: () => import('../views/CartPage/CartPage.vue'),
    },
    {
        path: '/cart/info',
        name: 'cart-info',
        meta: {
            requireAuth: true,
        },
        component: () => import('../views/CartPage/CartInform.vue'),
    },
    {
        path: '/:path(.*)*',
        name: 'page-not-found',
        meta: {
            requireAuth: false,
        },
        component: () => import('../views/PageNotFound.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    if (to.meta?.requireAuth) {
        if (!isAuthenticated())
            return {
                name: 'login',
            }
        // if (!isRouteAvailable(to)) {
        //     return {
        //         name: 'page-not-found',
        //     }
        // }
    }
})

export default router
