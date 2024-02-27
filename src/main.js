import './assets/base.css'
import './assets/output.css'

import { createApp } from 'vue'
import App from './App.vue'
// import PrimeVue from 'primevue/config';
// import { usePrimeVue } from "primevue/config";
// import 'primevue/resources/primevue.min.css'
// import 'primevue/resources/themes/lara-light-indigo/theme.css'
// import InputSwitch from 'primevue/inputswitch';
// import FileUpload from 'primevue/fileupload';



var app = createApp(App)

// app.use(PrimeVue)
// app.component('InputSwitch', InputSwitch)
// app.component('FileUpload', FileUpload)

app.mount('#app')