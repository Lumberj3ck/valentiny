<template>
  <div class="max-w-screen-lg mx-auto mt-5 px-4">
    <ol class="flex flex-col md:flex-row items-center w-full">
      <li v-for="(step, index) in steps" :key="index" class="flex flex-col md:flex-row items-center w-full mb-4 md:mb-0">
        <div
          class="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ease-in-out"
          :class="index + 1 <= currentStep ? 'bg-purple-500' : 'bg-gray-300'"
        >
          <i
            :class="[
              index + 1 <= currentStep ? 'fas fa-check-circle' : step.icon,
              'text-xl',
              index + 1 <= currentStep ? 'text-white' : 'text-gray-500'
            ]"
          ></i>
        </div>
        <div class="flex-1 ml-4 text-center md:text-left mt-2 md:mt-0">
          <h3
            class="font-medium"
            :class="index + 1 <= currentStep ? 'text-purple-500' : 'text-gray-500'"
          >
            {{ step.title }}
          </h3>
          <p class="text-sm text-gray-500">{{ step.description }}</p>
        </div>
        <div v-if="index < steps.length - 1" class="hidden md:block flex-1 h-0.5 bg-gray-300 mx-2">
          <div
            class="h-full bg-purple-500 transition-all duration-500"
            :style="{ width: index + 1 < currentStep ? '100%' : '0%' }"
          ></div>
        </div>
      </li>
    </ol>
  </div>



  <div>
    <user_notification
      :message="message"
      :show="notification"
      @update:show="notification = false"
      :duration="2500"
      type="success"
    ></user_notification>
    <div v-if="currentStep === 1">
      <user_register v-if="!login" :onboarding="true" @register-success="register_success">
        <div class="my-3">
          If you already have an account,
          <span @click="login = true" class="text-purple-500 cursor-pointer">login</span>
        </div>
      </user_register>
      <div v-if="login">
        <user_login :onboarding="true" @login-success="login_success">
          <div class="my-3">
            If you don't have an account,
            <span @click="login = false" class="text-purple-500 cursor-pointer">register</span>
          </div>
        </user_login>
      </div>
    </div>
    <div v-if="currentStep === 2" class="mt-8">
      <stripe_checkout
        ref="stripe_checkout"
        @checkout-return="checkSessionStatus"
        :onboarding="true"
      />
    </div>
    <div v-if="currentStep === 3">
      <website_publish />
    </div>
  </div>
</template>

<script>
import user_register from '@/components/authentication/user_register.vue'
import website_publish from '@/components/website_publish.vue'
import stripe_checkout from '@/components/stripe_checkout.vue'
import user_login from '@/components/authentication/user_login.vue'
import { checkSessionStatus } from '@/js/api'
import Confetti from 'vue-confetti/src/confetti.js'
import { is_user_balance_enough, isAuthenticated } from '@/js/utils'
import user_notification from '@/components/utils/user_notification.vue'
import { useSectionStore } from '@/stores/SectionStrore'

export default {
  components: {
    user_register,
    website_publish,
    stripe_checkout,
    user_login,
    user_notification
  },
  setup() {
    const sectionStore = useSectionStore()

    return {
      sectionStore
    }
  },
  data() {
    return {
      currentStep: 1,
      login: false,
      confetti: new Confetti(),
      message: '',
      notification: false,
      steps: [
        { title: 'User Info', description: 'Register your account', icon: 'fa-solid fa-user' },
        { title: 'Payment Info', description: 'Pay for website publishing', icon: 'fa-solid fa-credit-card' },
        { title: 'Publish Website', description: 'Choose domain name and publish', icon: 'fa-solid fa-globe' },
      ] 
    }
  },
  async mounted() {

    if (isAuthenticated() ) {
      const enough = await is_user_balance_enough()
      const sessionId = this.$route.query.session_id
      if (enough && !sessionId) {
        this.currentStep = 3
      } else {
        this.currentStep = 2
      }
    }
  },
  methods: {
    login_success() {
      this.nextStep()
      this.message = 'Logged in successfully'
      this.notification = true
      this.sectionStore.debouncedSave()
    },
    register_success() {
      this.nextStep()
      this.message = 'Registered successfully'
      this.notification = true
      this.sectionStore.debouncedSave()
    },
    async nextStep() {
      if (this.currentStep === 1) {
        const enough = await is_user_balance_enough()
        if (enough) {
          this.currentStep = 3
          return
        }
      } 
      this.currentStep++
    },
    async checkSessionStatus() {
      const sessionId = this.$route.query.session_id

      const data = await checkSessionStatus(sessionId)
      const sufficient_balance = await is_user_balance_enough()
      if (data.status === 'complete' && sufficient_balance) {
        this.currentStep = 3
        this.message = 'Payment successful'
        this.notification = true
        this.confetti.start({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        setTimeout(() => this.confetti.stop(), 2500)
      } else if (data.status === 'complete' && !sufficient_balance) {
        this.$router.push('checkout/')
      } else if (data.status === 'open') {
        this.$router.push('checkout?warning=true')
      }
    }
  }
}
</script>
