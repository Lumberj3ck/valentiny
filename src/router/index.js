import { createRouter, createWebHistory } from 'vue-router'
import MainSection from '@/components/main_section.vue'
import LandingPage from '@/components/landing_page.vue'
import FeaturesGuide from '@/components/features_guide.vue'
import WebsiteUploadGuide from '@/components/website_upload_guide.vue'


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
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router