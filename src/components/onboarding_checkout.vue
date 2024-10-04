<template>
<div class="max-w-screen-lg mx-auto mt-5">
  <ol class="justify-center items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
      <li class="flex items-center text-pink-500  space-x-2.5 rtl:space-x-reverse">
          <span class="flex items-center justify-center w-8 h-8 border border-pink-500 rounded-full shrink-0 ">
              1
          </span>
          <span>
              <h3 class="font-medium leading-tight">User info</h3>
              <p class="text-sm">Register your account</p>
          </span>
      </li>
      <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
          <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              2
          </span>
          <span>
              <h3 class="font-medium leading-tight">Payment Info</h3>
              <p class="text-sm">Pay for website publishing</p>
          </span>
      </li>
      <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
          <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
          </span>
          <span>
              <h3 class="font-medium leading-tight">Publish website</h3>
              <p class="text-sm">Choose domain name and publish </p>
          </span>
      </li>
  </ol>
</div>

  <div>
    <div v-if="currentStep === 1">
      <user_register @register-success="nextStep" />
    </div>
    <div v-if="currentStep === 2">
      <stripe_checkout @checkout-success="nextStep" />
    </div>
    <div v-if="currentStep === 3">
      <website_publish @publish-success="nextStep" />
    </div>
  </div>
</template>

<script>
import user_register from '@/components/authentication/user_register.vue'
import website_publish from '@/components/website_publish.vue'
import stripe_checkout from '@/components/stripe_checkout.vue'

export default {
  components: {
    user_register,
    website_publish,
    stripe_checkout
  },
  data() {
    return {
      currentStep: 1
    }
  },
  methods: {
    nextStep() {
      this.currentStep++
    }
  }
}
</script>
