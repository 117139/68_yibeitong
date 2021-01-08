import Vue from 'vue'
import App from './App'

import store from './store'
import event from 'common/event.js'
import con_base64 from 'common/base64.js'
import cuCustom from './colorui/components/cu-custom.vue'
import uParse from '@/components/gaoyia-parse/parse.vue'
Vue.component('cu-custom',cuCustom)
Vue.component('u-parse',uParse)

Vue.config.productionTip = false

Vue.prototype.event = event;

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()