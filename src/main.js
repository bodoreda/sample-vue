import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'

const callApi = axios.create({
    baseURL: 'http://localhost:8080/api'
})

createApp(App)
    .use(router)
    .provide('callApi', callApi)
    .mount('#app')
