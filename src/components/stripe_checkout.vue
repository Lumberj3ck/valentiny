<template>
    <router-link
      to="/page-editor/"
      class="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      Home
    </router-link>
  <div id="checkout"></div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import { fetchClientSecret } from '@/js/api';

export default {
  data() {
    return {
      stripe: null,
      card: null,
      isLoading: false,
      errorMessage: ''
    }
  },
  async mounted() {
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
  unmounted() {
    if (this.checkout) {
      this.checkout.destroy();
    }
  },
  methods: {}
}
</script>
