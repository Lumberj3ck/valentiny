<script>
import {register_user} from '@/js/api'
import alert_box from '@/components/utils/alert_box.vue'

export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',
            error: '',
            error_message: ''
        }
    },
    components:{
      alert_box
    },
    methods:{
        async submit(){
            register_user(this.username, this.email, this.password)
                .then(data => {
                    const token = data
                    // localStorage.setItem('access-token', token.access_token)
                    // const token = response.json()
                    localStorage.setItem('access-token', token.access_token)
                    if (token.access_token) {
                        this.$router.push('/page-editor')
                    }
                })
                .catch(error => {
                    this.error_message = error.message
                    this.error = true
                });
            // this.$router.push('/page-editor')
        }
    }

}
</script>

<template>
    <alert_box @alert_box_close="error = !error" v-if="error" :error_message="error_message"></alert_box>
    <!-- <form @submit.prevent="submit" class="flex flex-col">
        <input type="text" placeholder="Username" v-model="username">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit">Register</button>
    </form> -->


<form @submit.prevent="submit" class="max-w-sm mx-auto mt-10">
    <h1 class="font-semibold text-lg mb-5">Register</h1>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
    <input v-model="email" type="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
    <input v-model="username" type="text"  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="username example" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
    <input v-model="password"  type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <!-- <div class="mb-5">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
    <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div> -->
  <!-- <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div> -->
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
</form>

</template>
