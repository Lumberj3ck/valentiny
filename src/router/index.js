import { createRouter, createWebHistory } from 'vue-router'
import MainSection from '@/components/main_section.vue'
import LandingPage from '@/components/landing_page.vue'


const routes = [
    {
        path: '/', 
        // name: 'Home', 
        component: LandingPage, 
    },
    {
        path: '/page_editor/', 
        component: MainSection, 
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router