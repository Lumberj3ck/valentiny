<template>
  <form v-if="!loading" @submit.prevent="login" class="max-w-sm mx-auto mt-10 w-4/5">
    <error_notification 
      v-if="error && error_message !== 'Incorrect username or password'" 
      :duration="2000" 
      :message="error_message ? error_message : ''" 
      :show="error"  
      @update:show="error_message = null"
    ></error_notification>
    <div class="mb-5">
      <h1 class="mb-5 font-semibold text-lg">Login</h1>
      <p v-if="credetialsError" class="mt-2 text-sm font-medium text-red-500 mb-4">
        <span class="font-medium">  </span> {{ credetialsError }}
      </p>
      <label for="username" class="block mb-2 text-sm font-medium" :class="{'text-gray-900': !credetialsError, 'text-red-500': credetialsError}">Your username</label>
      <input 
        autocomplete="on" 
        v-model="username" 
        type="text" 
        id="username" 
        :class="{
          'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5': !credetialsError,
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5': credetialsError
        }"
        placeholder="Example" 
        required 
      />
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium" :class="{'text-gray-900': !credetialsError, 'text-red-500': credetialsError}">Your password</label>
      <input 
        v-model='password' 
        type="password" 
        id="password" 
        :class="{
          'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5': !credetialsError,
          'bg-red-50 border border-red-500 text-red-900  placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5': credetialsError
        }"
        required 
      />
    </div>
    <div class="flex items-start mb-5">
      <router-link :to="{ path: '/register/', query: $route.query }" class="nav_text nav_link font-semibold text-base"
        style="text-underline-offset: 1px; text-decoration: underline;">
        Register
      </router-link>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
  </form>
  <loading_spinner v-if="loading"></loading_spinner>
</template>

<script>
import { login_user } from '@/js/api'
import error_notification from '../utils/error_notification.vue'
import loading_spinner from '../utils/loading_spinner.vue'

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      error: false,
      error_message: '',
      loading: false,
      credetialsError: ''
    }
  },
  components: {
    error_notification,
    loading_spinner
  },
  methods: {
    async login() {
      this.loading = true
      this.clearErrors()
      
      login_user(this.username, this.password)
        .then(data => {
          this.loading = false 
          const token = data
          localStorage.setItem('access-token', token.access_token)

          if (token.access_token) {
            const redirect = this.$route.query.redirect
            if (redirect) {
              this.$router.push(redirect)
            } else {
              this.$router.push('/page-editor')
            }
          }
        })
        .catch(error => {
          this.loading = false
          if (error.message === 'Incorrect username or password') {
            this.credetialsError = 'Username or password is incorrect'
          } else {
            this.error_message = error.message
            this.error = true
          }
        });
    },
    clearErrors() {
      this.error = false
      this.error_message = ''
      this.usernameError = ''
      this.credetialsError = ''
    }
  }
}
</script>