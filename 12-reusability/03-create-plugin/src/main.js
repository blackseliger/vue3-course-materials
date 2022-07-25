import { createApp } from 'vue';
import App from './App.vue';
import { toaster } from './toaster.js';

createApp(App).use(toaster).mount('#app');
