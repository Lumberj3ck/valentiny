<template>
  <div v-if="checkout_return">
    <checkout_return />
  </div>
  <div class="flex justify-center mb-4">
    <router-link
      to="/page-editor/"
      class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300">
      <i class="fas fa-arrow-left h-5 w-5 mr-2"></i>
      Back to Editor
      </router-link>
    </div>
    <div id="checkout"></div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import { fetchClientSecret } from '@/js/api';
import checkout_return from './checkout_return.vue';

export default {
  components: {
    checkout_return
  },
  data() {
    return {
      stripe: null,
      card: null,
      isLoading: false,
      errorMessage: '',
      checkout_return: false
    }
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      this.checkout_return = true
      return;
    }

    if (!this.stripe) {
      this.stripe = await loadStripe(
        'pk_test_51Ncm9BGG1bSL8LD4bWHztaALnFRI8weo3ahRLHnGOTOZk8KjzjJt1AVNVRpAIpp8crliJYI8KZZOHK8CclP1qv4T00oGmPV5Gv'
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
  watch: {
    '$route.fullPath': {
      handler(newPath) {
        console.log('New URL:', newPath);
      },
      immediate: true
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
