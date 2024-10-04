<template>
  <form v-if="!loading" @submit.prevent="submit" class="max-w-sm mx-auto mt-10 w-4/5">
    <error_notification 
      v-if="error && !isFieldError" 
      :duration="2000" 
      :message="error_message ? error_message : ''" 
      :show="error"  
      @update:show="error_message = null"
    ></error_notification>
    <h1 class="font-semibold text-lg mb-5">Register</h1>
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium" :class="{'text-gray-900': !uniquenessError, 'text-red-700': uniquenessError}">Email</label>
      <p v-if="uniquenessError" class="my-3 text-sm text-red-600">
        <span class="font-medium"></span> {{ uniquenessError }}
      </p>
      <input 
        @change="clearErrors"
        v-model="email" 
        id="email" 
        type="email" 
        autocomplete="on"
        :class="{
          'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5': !uniquenessError,
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5': uniquenessError
        }"
        placeholder="example@gmail.com" 
        required 
      />
    </div>
    <div class="mb-5">
      <label for="username" class="block mb-2 text-sm font-medium" :class="{'text-gray-900': !uniquenessError, 'text-red-700': uniquenessError}">Username</label>
      <input 
        @change="clearErrors"
        id='username' 
        v-model="username" 
        type="text" 
        autocomplete="on"
        :class="{
          'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5': !uniquenessError,
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5': uniquenessError
        }"
        placeholder="username example" 
        required
      />
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium" :class="{'text-gray-900': !passwordConfirmError, 'text-red-700': passwordConfirmError}">Password</label>
      <p v-if="passwordConfirmError" class="my-3 text-sm text-red-600">
        <span class="font-medium"></span> {{ passwordConfirmError }}
      </p>
      <input 
        id="password" 
        @input="password_confirm ? debouncedCheckPasswords() : null" 
        v-model="password" 
        type="password"
        :class="{
          'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5': !passwordConfirmError,
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5': passwordConfirmError
        }"
        required 
      />
    </div>
    <div class="mb-5">
      <label for="password_confirm" class="block mb-2 text-sm font-medium" :class="{'text-gray-900': !passwordConfirmError, 'text-red-700': passwordConfirmError}">Confirm password</label>
      <input 
        id="password_confirm" 
        v-model="password_confirm" 
        @input="not_first_time_confirm && debouncedCheckPasswords()" 
        @change="not_first_time_confirm = true; debouncedCheckPasswords()"
        type="password"
        :class="{
          'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5': !passwordConfirmError,
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5': passwordConfirmError
        }"
        required 
      />
    </div>
    <button 
      type="submit"
      class="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Register new account
    </button>
  </form>
  <loading_spinner v-if="loading"></loading_spinner>
</template>

<script>
import { register_user } from '@/js/api'
import error_notification from '../utils/error_notification.vue'
import loading_spinner from '../utils/loading_spinner.vue'

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      password_confirm: '',
      error: false,
      error_message: '',
      loading: false,
      uniquenessError: '',
      passwordConfirmError: '',
      not_first_time_confirm: false
    }
  },
  components: {
    error_notification,
    loading_spinner
  },
  computed: {
    isFieldError() {
      return this.uniquenessError || this.passwordError || this.passwordConfirmError
    }
  },
  methods: {
    debouncedCheckPasswords() {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.check_passwords_match()
      }, 200) 
    },
    check_passwords_match() {
      if (!this.password || !this.password_confirm) {
        this.passwordConfirmError = ''
        return
      }
      if (this.password !== this.password_confirm) {
        this.passwordConfirmError = 'Passwords do not match'
      } else {
        this.passwordConfirmError = ''
      }
    },
    clearErrors() {
      this.error = false
      this.error_message = ''
      this.uniquenessError = ''
      this.passwordConfirmError = ''
    },
    async submit() {
      this.clearErrors()
      this.check_passwords_match()

      if (this.isFieldError) {
        return
      }

      this.loading = true
      register_user(this.username, this.email, this.password)
        .then(data => {
          const token = data
          this.loading = false 
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
          if (error.message.includes('email') || error.message.includes('username')) {
            this.uniquenessError = error.message
          } else if (error.message.includes('password')) {
            this.passwordError = error.message
          } else {
            this.error_message = error.message
            this.error = true
          }
        });
    }
  }
}
</script>