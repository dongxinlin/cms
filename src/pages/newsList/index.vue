<template>
  <div class="news-list-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/'+item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          >
          <div class="mui-media-body">
            <h3>{{item.title}}</h3>
            <p class='mui-ellipsis'><span>{{item.add_time | dateFormat}}</span> <span>点击{{item.click}}次</span></p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            newsList:[]
        }
    },
    created(){
        this.getNewsLists()
    },
    methods: {
        getNewsLists(){
            this.$http.get('api/getnewslist').then(res=>{
                if(res.body.status==0){
                    this.newsList=res.body.message
                }else{
                    Toast('数据获取失败!')
                }
            })
        }
    },
}
</script>

<style lang="less" scope>
    .mui-media-body{
        h3{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
