import { createRouter, createWebHistory } from 'vue-router'
import MainSection from '@/components/sections/main_section.vue'
import LandingPage from '@/components/landing_page.vue'
import FeaturesGuide from '@/components/features_guide.vue'
import WebsiteUploadGuide from '@/components/website_upload_guide.vue'
import user_register from '@/components/authentication/user_register.vue'
import user_login from '@/components/authentication/user_login.vue'


const routes = [
    {
        path: '/', 
        component: LandingPage, 
    },
    {
        path: '/user-guide/', 
        component: FeaturesGuide, 
    },
    {
        path: '/website-upload/', 
        component: WebsiteUploadGuide, 
    },
    {
        path: '/page-editor/', 
        component: MainSection, 
    },
    {
        path: '/register/', 
        component: user_register, 
    },
    {
        path: '/login/', 
        component: user_login, 
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router