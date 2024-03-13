<script>
import { login_user } from '@/js/api'

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
    methods: {
        async login() {
            login_user(this.username, this.password)
                .then(data => {
                    const token = data
                    localStorage.setItem('access-token', token.access_token)
                    if (token.access_token) {
                        this.$router.push('/page-editor')
                    }
                })
                .catch(error => {
                    this.error_message = error
                    this.error = true
                });
        }
    }

}
</script>

<template>
    <label v-if="error">
        <input type="checkbox" class="alertCheckbox" autocomplete="off" />
        <div class="alert error">
            <span class="alertClose">X</span>
            <span class="alertText">{{  error_message }}
                <br class="clear" /></span>
        </div>
    </label>
    <form @submit.prevent="login" class="flex flex-col">
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit">Login</button>
    </form>
</template>

<style>
.alert {
    position: relative;
    top: 10;
    left: 0;
    width: auto;
    height: auto;
    padding: 10px;
    margin: 10px;
    line-height: 1.8;
    border-radius: 5px;
    cursor: hand;
    cursor: pointer;
    font-family: sans-serif;
    font-weight: 400;
}

.alertCheckbox {
    display: none;
}

:checked+.alert {
    display: none;
}

.alertText {
    display: table;
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
}

.alertClose {
    float: right;
    padding-top: 5px;
    font-size: 10px;
}

.clear {
    clear: both;
}

.error {
    background-color: #FEE;
    border: 1px solid #EDD;
    color: #A66;
}
</style>