<template >
    <div class="photo-info-container">
        <h1 class="title">{{imgInfo.title}}</h1>
        <p class="time"><span>发表时间: {{imgInfo.add_time | dateFormat}}</span> <span>点击: {{imgInfo.click}}次</span></p>
        <hr>
        <div class="imgList">
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
        </div>
        <div class="img-content" v-html="imgInfo.content">
        </div>
        <comment :id="this.id"></comment>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:this.$route.params.imgid,
            imgInfo:{},
            list:[]
        }
    },
    created(){
        this.getImageInfo()
        this.getThumIages()
    },
    methods:{
        getThumIages(){
            this.$http.get('api/getthumimages/'+this.id).then(res=>{
                if(res.body.status===0){
                    res.body.message.forEach(element => {
                        element.w=600
                        element.h=400
                    });
                }
                this.list=res.body.message
            })
        },
        getImageInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(res=>{
                if(res.body.status===0){
                    this.imgInfo=res.body.message[0]
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .photo-info-container{
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
        .imgList{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #ccc;
            }
        }
        .img-content{
            font-size: 13px;
            line-height: 30px;
        }
    }
    
</style>
