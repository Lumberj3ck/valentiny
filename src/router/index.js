import { createRouter, createWebHistory } from 'vue-router'
import MainSection from '@/components/sections/main_section.vue'
import LandingPage from '@/components/landing_page.vue'
import FeaturesGuide from '@/components/features_guide.vue'
import WebsiteUploadGuide from '@/components/website_upload_guide.vue'
import user_register from '@/components/authentication/user_register.vue'
import user_login from '@/components/authentication/user_login.vue'
import website_publish from '@/components/website_publish.vue'
import checkout from '@/components/stripe_checkout.vue'
// import { get_user_balance } from '@/js/api'
// import checkout_return from '@/components/checkout_return.vue'
import onboarding_checkout from '@/components/onboarding_checkout.vue'
import { is_user_balance_enough, isAuthenticated } from '@/js/utils'




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
        meta: { requiresAuthAndBalance: true }
    },
    {
        path: '/checkout/', 
        component: checkout, 
        meta: { requiresAuth: true }
    },
    // {
    //     path: '/checkout-return/', 
    //     component: checkout_return, 
    //     meta: { requiresAuth: true }
    // },
    {
        path: '/onboarding-checkout/', 
        component: onboarding_checkout, 
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuthAndBalance)) {
        if (!isAuthenticated()) {
            next({ path: '/login', query: { redirect: to.fullPath } })
        } 

        const enough = await is_user_balance_enough()
        if (!enough) {
            next({ path: '/checkout', query: { redirect: to.fullPath } })
        } 
        else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresNoUser)){
        if (isAuthenticated()) {
            next({path: "/page-editor/"})
        } else {
            next()
        }
    } 
    else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated()) {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.fullPath } })
        }
    } else {
        next()
    }
})




export default router
