<template>
    <div class="goods-desc-container">
        <h1 class="title">{{imgTextList.title}}</h1>
        <hr>
        <div v-html="imgTextList.content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:this.$route.params.id,
            imgTextList:{}
        }
    },
    created(){
       this.getIntroduce()
    },
    methods: {
        getIntroduce(){
            this.$http.get('api/goods/getdesc/'+this.id).then(res=>{
                if(res.body.status===0){
                    this.imgTextList=res.body.message[0]
                }
            })
        }
    },

}
</script>
<style lang="less">
.goods-desc-container{
    padding: 5px;
    .title{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 10px 0;
        font-weight: 800;
    }
    img{
        width: 100%;
    }
}
</style>
