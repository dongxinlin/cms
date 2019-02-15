// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'

import comment from './components/common/comment.vue'

// VueResource的引用
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 配置主域名地址
Vue.http.options.root = 'http://www.lovegf.cn:8899/';
//配置post请求的格式
Vue.http.options.emulateJSON = true;

// 引入初始化css
import './styles/common.css'

//引入mui
import './libs/mui/css/mui.css'
import './libs/mui/css/icons-extra.css'


// mint-ui的引入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 全局过滤器
Vue.filter('dateFormat',function(content,pattern='YYYY-MM-DD HH:mm:ss'){
   return moment(content).format(pattern)
})

// 注册全局组件 comment
Vue.component('comment', comment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
