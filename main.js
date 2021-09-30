import Vue from 'vue'
import App from './App'

// import TIM from 'tim-wx-sdk'

// import tim from './common/tim/tim.js'
import common from './common/common.js'

import store from './store/index.js'
import event from 'common/event.js'
import con_base64 from 'common/base64.js'
import cuCustom from './colorui/components/cu-custom.vue'
import uParse from '@/components/gaoyia-parse/parse.vue'
Vue.component('cu-custom',cuCustom)
Vue.component('u-parse',uParse)

// import service from './service.js'
// Vue.mixin(service)

// 页面初始化
import htmlLoading from '@/components/html_loading/html_loading.vue'
Vue.component('htmlLoading', htmlLoading)



Vue.config.productionTip = false

// Vue.prototype.tim = tim.tim  			//tim sdk 引入后生成的tim服务
// Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量
Vue.prototype.event = event;

Vue.prototype.$store = store
Vue.prototype.$common = common

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()