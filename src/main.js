import './assets/main.css'

import { createApp } from 'vue';    
import App from './App.vue';
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init();

// import router from './router';


createApp(App).mount('#app');


// .use(router)