import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseSection from './components/ui/BaseSection.vue'
import BaseVideoThumbnail from './components/ui/BaseVideoThumbnail.vue'
import BaseButton from './components/ui/BaseButton.vue'

const app = createApp(App)

app.use(store)
app.use(router)

app.component('base-section', BaseSection)
app.component('base-video-thumbnail', BaseVideoThumbnail)
app.component('base-button', BaseButton)

app.mount('#app')
