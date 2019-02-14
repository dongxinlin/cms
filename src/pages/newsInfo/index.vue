<template>
    <div class="news-info-container">
        <h1 class="title">{{message.title}}</h1>
        <p class="time"><span>发表时间: {{message.add_time | dateFormat}}</span> <span>点击: {{message.click}}</span></p>
        <hr>
        <div class="content" v-html="message.content"></div>
        <comment></comment>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            id:this.$route.params.id,
            message:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(res=>{
                if(res.body.status===0){
                    this.message=res.body.message[0]
                }else{
                    Toast('获取失败')
                }
            })
        }
    }
}
</script>
<style lang="less" scope>
.news-info-container{
    padding: 0 5px;
    .title{
        text-align: center;
        color: red;
        font-size: 16px;
        margin: 15px 0;
        font-family: 800;
    }
    .time{
        display: flex;
        justify-content: space-between;
        color: #226aff;
        font-size: 12px;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>
