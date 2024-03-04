import './assets/base.css'
import './assets/main.css'
import './assets/output.css'

import { createApp } from 'vue/dist/vue.esm-bundler.js'
// import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'



var app = createApp(App)

app.use(router)
// app.component('InputSwitch', InputSwitch)
// app.component('FileUpload', FileUpload)

app.mount('#app')