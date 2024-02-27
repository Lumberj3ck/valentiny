import { createRouter, createWebHistory } from 'vue-router'
import MainSection from '@/components/main_section.vue'
import LandingPage from '@/components/landing_page.vue'
import LandingPage1 from '@/components/landing_page1.vue'


const routes = [
    {
        path: '/', 
        // name: 'Home', 
        // component: LandingPage, 
        component: LandingPage, 
    },
    {
        path: '/1/', 
        // name: 'Home', 
        // component: LandingPage, 
        component: LandingPage1, 
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