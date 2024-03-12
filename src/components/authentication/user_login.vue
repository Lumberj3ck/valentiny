<script>
import {login_user} from '@/js/api'

export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',

        }
    },
    methods:{
        async login(){
            const response = await login_user(this.username, this.password)
            const token = await response.json()
            localStorage.setItem('access-token', token.access_token)
            if (token.access_token){
                this.$router.push('/page-editor')
            }
        }
    }

}
</script>

<template>
    <form @submit.prevent="login" class="flex flex-col">
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit">Login</button>
    </form>
</template>