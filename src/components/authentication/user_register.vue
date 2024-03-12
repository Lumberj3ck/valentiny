<script>
import {register_user} from '@/js/api'

export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',

        }
    },
    methods:{
        async submit(){
            const response = await register_user(this.username, this.email, this.password)
            const token = await response.json()
            localStorage.setItem('access-token', token.access_token)

            this.$router.push('/page-editor')
        }
    }

}
</script>

<template>
    <form @submit.prevent="submit" class="flex flex-col">
        <input type="text" placeholder="Username" v-model="username">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit">Register</button>
    </form>
</template>
