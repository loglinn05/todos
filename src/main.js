import 'mdb-ui-kit/js/mdb.min.js'
import '@/assets/css/main.css'
import { createApp } from 'vue'
import AppComponent from './App.vue'
import router from './router'
import components from '@/components/global-components'

let App = createApp(AppComponent);

components.forEach(component => {
    App.component(component.name, component)
})

App.use(router).mount('#app')
