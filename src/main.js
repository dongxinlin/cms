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

// 引入图片预览插件
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

// Vuex的引用
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    car: JSON.parse(localStorage.getItem('car') || '[]')
  },
  mutations: {
    //购物车的添加按钮
    addToCar (state,message) {
      let index=state.car.findIndex(val=>val.id===message.id)
      if(index!==-1){
        state.car[index].count+=message.count
      }else{
        state.car.push(message)
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    // 自减同步
    updateCount(state,obj){
      state.car.some(item=>{
        if(item.id==obj.id){
          item.count=obj.count
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 删除的同步
    removedataCount(state,id){
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    // 同步开关
    updateSelected(state,obj){
      state.car.some(item=>{
        if(item.id==obj.id){
          item.selected=!obj.selected
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
    
  },
  getters:{
    // 同步徽标
    totalCount(state){
      let totalCount=0
      state.car.forEach(element => totalCount+=element.count)
      return totalCount
    },
    // 数量的同步
    carNumber(state){
      let carNumber= {}
      state.car.forEach(element=>{
        carNumber[element.id]=element.count
      })
      return carNumber 
    },
    // 状态的同步
    goodsStateChanged(state){
      let o={}
      state.car.forEach(element=>{
        o[element.id]=element.selected
      })
      return o
    },
    // 商品的数量
    goodsCountAndAmount(state){
      let o={
        count:0,
        amout:0
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count
          o.amout+=item.count*item.price
        }
      })
      return o
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
