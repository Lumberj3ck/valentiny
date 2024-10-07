<template>
  <user_notification
    :message="message"
    :show="notification"
    @update:show="notification = false"
    :duration="2500"
    type="warning"
  ></user_notification>
  <div v-if="checkout_return">
    <checkout_return />
  </div>
  <!-- <div class="flex justify-center mb-4">
    <router-link
      to="/page-editor/"
      class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300">
      <i class="fas fa-arrow-left h-5 w-5 mr-2"></i>
      Back to Editor
      </router-link>
    </div> -->
    <div class="mt-5" id="checkout"></div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import { fetchClientSecret } from '@/js/api';
import checkout_return from './checkout_return.vue';
import user_notification from '@/components/utils/user_notification.vue'

export default {
  components: {
    checkout_return,
    user_notification
  },
  props: {
    onboarding: {
      type: Boolean,
      default: false
    },
  },
  emits: {
    'checkout-return': null
  },
  data() {
    return {
      stripe: null,
      checkout_return: false,
      notification: false,
      message: ''
    }
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    const warningParam = urlParams.get('warning');
    if (warningParam === 'true') {
      this.notification = true;
      this.message = "Something went wrong with your payment, please try again"
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('warning');
      window.history.replaceState({}, '', newUrl);
    }

    if (sessionId && !this.onboarding) {
      this.checkout_return = true
      return;
    } else if (sessionId && this.onboarding) {
      this.$emit('checkout-return')
      return;
    }

    if (!this.stripe) {
      this.stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_KEY
      )
    }

    const checkoutElement = document.querySelector('#checkout');
    if (checkoutElement && !checkoutElement.hasChildNodes()) {
      this.checkout = await this.stripe.initEmbeddedCheckout({
        fetchClientSecret
      })
      this.checkout.mount('#checkout')
    }
  },
  unmounted() {
    if (this.checkout) {
      this.checkout.destroy();
    }
  },
  methods: {}
}
</script>
