import { createRouter, createWebHistory } from 'vue-router'
import MainSection from '@/components/sections/main_section.vue'
import LandingPage from '@/components/landing_page.vue'
import FeaturesGuide from '@/components/features_guide.vue'
import WebsiteUploadGuide from '@/components/website_upload_guide.vue'
import user_register from '@/components/authentication/user_register.vue'
import user_login from '@/components/authentication/user_login.vue'
import website_publish from '@/components/website_publish.vue'





const routes = [
    {
        path: '/', 
        component: LandingPage, 
    },
    {
        path: '/features-guide/', 
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
        meta: { requiresNoUser: true }
    },
    {
        path: '/login/', 
        component: user_login, 
        meta: { requiresNoUser: true }
    },
    {
        path: '/publish/', 
        component: website_publish, 
        meta: { requiresAuth: true }
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated()) {
            next({ path: '/login', query: { redirect: to.fullPath } })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresNoUser)){
        if (isAuthenticated()) {
            next({path: "/page-editor/"})
        } else {
            next()
        }
    } else {
        next()
    }
})

function isAuthenticated() {
    const authorization_token = localStorage.getItem('access-token');
    return authorization_token !== null
}


export default router
