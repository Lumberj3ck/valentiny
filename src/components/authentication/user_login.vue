<script>
import { login_user } from '@/js/api'
import alert_box from '@/components/utils/alert_box.vue'
import loading_spinner from '../utils/loading_spinner.vue'

export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',
            error: '',
            error_message: '',
            loading: false

        }
    },
    components:{
        alert_box, 
        loading_spinner
    },
    methods: {
        async login() {
            this.loading = true
            login_user(this.username, this.password)
                .then(data => {
                    this.loading = false 
                    const token = data
                    localStorage.setItem('access-token', token.access_token)
                    if (token.access_token) {
                        this.$router.push('/page-editor')
                    }
                })
                .catch(error => {
                    this.error_message = error.message
                    this.error = true
                    this.loading = false 
                });
        }
    }

}
</script>

<template>
<form v-if="!loading" @submit.prevent="login" class="max-w-sm mx-auto mt-10 w-4/5">
  <alert_box @alert_box_close="error = !error" v-if="error" :error_message="error_message"></alert_box>
  <div class="mb-5">
    <h1 class="mb-5 font-semibold text-lg">Login</h1>
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
    <input autocomplete="on" v-model="username" type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
    <input v-model='password' type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="flex items-start mb-5">
    <!-- <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div> -->
    <!-- <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label> -->
      <router-link to="/register/" class="nav_text nav_link font-semibold text-base"
        style="text-underline-offset: 1px; text-decoration: underline;">
        Register
      </router-link>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
<loading_spinner v-if="loading"></loading_spinner>

</template>
