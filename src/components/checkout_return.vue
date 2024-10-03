<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <section v-else-if="status === 'complete'" id="success">
      <p>
        We appreciate your business! A confirmation email will be sent to {{ customerEmail }}. If you have any questions, please email 
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </p>
    </section>
    <div v-else-if="status === 'open'">
      Redirecting to checkout...
    </div>
    <div v-else>
      Unknown status. Please contact support.
    </div>
    <router-link
      to="/page-editor/"
      class="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      Home
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      errorMessage: '',
      status: null,
      customerEmail: ''
    }
  },
  mounted() {
    this.checkSessionStatus()
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

        if (this.status === 'open') {
          this.$router.push('/checkout')
        }
      } catch (error) {
        console.error('Error checking session status:', error)
        this.errorMessage = 'Failed to check session status'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>