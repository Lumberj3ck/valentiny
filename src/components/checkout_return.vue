<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="p-8">
        <div v-if="isLoading" class="flex flex-col items-center justify-center">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
          <p class="mt-4 text-gray-600">Loading...</p>
        </div>

        <div v-else-if="errorMessage" class="text-center">
          <i class="fas fa-times-circle h-16 w-16 text-red-500 mx-auto mb-4"></i>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p class="text-gray-600">{{ errorMessage }}</p>
        </div>

        <section v-else-if="status === 'complete'" id="success" class="text-center">
          <i class="fas fa-check-circle h-16 w-16 text-green-500 mx-auto mb-4"></i>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p class="text-gray-600 mb-4">
            We appreciate your business! A confirmation email will be sent to <span class="font-semibold">{{ customerEmail }}</span>.
          </p>
          <p class="text-gray-600 mb-4">Now you can publish your website!</p>
          <div class="transition duration-300 ease-in-out transform hover:scale-105 mb-4">
            <RouterLink
              to="/publish/"
              class="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-3 md:py-2 md:px-4 rounded-lg shadow-md"
            >
              <i class="fas fa-globe w-5 h-5 mr-2"></i>
              Publish Website
            </RouterLink>
          </div>
          <p class="text-gray-600">
            If you have any questions, please email 
            <a href="mailto:orders@example.com" class="text-blue-500 hover:underline">orders@example.com</a>.
          </p>
        </section>

        <div v-else-if="status === 'open'" class="text-center">
          <i class="fas fa-spinner-third h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin"></i>
          <p class="text-gray-600">Redirecting to checkout...</p>
        </div>

        <div v-else class="text-center">
          <i class="fas fa-exclamation-triangle h-16 w-16 text-yellow-500 mx-auto mb-4"></i>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Unknown Status</h2>
          <p class="text-gray-600">Please contact support for assistance.</p>
        </div>

        <div class="mt-8 text-center">
          <router-link
            to="/page-editor/"
            class="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
          >
            <i class="fas fa-home h-5 w-5 mr-2"></i>
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useRouter } from 'vue-router'
import Confetti from "vue-confetti/src/confetti.js";

export default {
  data() {
    return {
      confetti: new Confetti(),
      isLoading: true,
      errorMessage: '',
      status: null,
      customerEmail: ''
    }
  },
  methods: {
    async checkSessionStatus() {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const sessionId = urlParams.get('session_id')

      if (!sessionId) {
        this.errorMessage = 'No session ID found in URL'
        this.isLoading = false
        return
      }

      try {
        const api_url = import.meta.env.VITE_SERVER_URL
        const response = await fetch(`${api_url}/session-status?session_id=${sessionId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access-token')}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch session status')
        }

        const data = await response.json()
        
        this.status = data.status
        this.customerEmail = data.customer_email

        if (this.status === 'complete') {
          this.confetti.start({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          })
          setTimeout(() => this.confetti.stop(), 2500)
        } else if (this.status === 'open') {
          this.$router.push('/checkout')
        }
      } catch (error) {
        console.error('Error checking session status:', error)
        this.errorMessage = 'Failed to check session status'
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.checkSessionStatus()
  }
}
</script>