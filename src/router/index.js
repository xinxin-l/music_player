import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
const routes = [{
        path: '',
        name: 'layout',
        component:()=>import('../views/layout.vue'),
        children: [
            {
                path:'',
                name:'init',
                redirect:'/today'
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/index.vue')
            },
            {
                path: '/popular',
                name: 'popular',
                component: () => import('../views/popular/index.vue')
            },
            {
                path: '/today',
                name: 'today',
                component: () => import('../views/today/index.vue')
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router