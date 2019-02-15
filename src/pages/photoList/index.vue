<template>
    <div class="photo-List-container">
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',{'mui-active':item.id==0}]" href="#item1mobile" data-wid="tab-top-subpage-1.html"
                    v-for="item in imgCategory" :key="item.id" @click="getPhotoList(item.id)">
                       {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <ul class="photo-list">
            <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
               <img v-lazy="item.img_url" >
               <div class="info">
                   <h1 class="info-title">{{item.title}}</h1>
                   <div class="info-body">{{item.zhaiyao}}</div>
               </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
// 导入mui的js组件
import mui from  "@/libs/mui/js/mui.min.js"

export default {
    data() {
        return {
            photoList:[],
            imgCategory:[]
        }
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created(){
        this.getimgcategory()
        this.getPhotoList(0)
    },
    methods:{
        getPhotoList(cateid){
            this.$http.get('api/getimages/'+cateid).then(res=>{
                if(res.body.status===0){
                    this.photoList=res.body.message
                }
            })
        },
        getimgcategory(){
            this.$http.get('api/getimgcategory').then(res=>{
                if(res.body.status===0){
                    this.imgCategory=res.body.message
                    this.imgCategory.unshift({title:"全部",id:0})
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.photo-List-container{
    touch-action: pan-y;
    .photo-list{
        padding: 0 10px;
        li{
            background-color: #ccc;
            text-align: center;
            box-shadow: 0 0 9px #999;
            position: relative;
           margin-bottom: 10px;
           img{
               width: 100%;
               display: block;
           }
           img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
            }
            .info{
                position: absolute;
                bottom: 0;
                max-height: 82px;
                text-align: left;
                color: #fff;
                background-color: rgba(0, 0, 0, .4);
                .info-title{
                    font-size: 13px;
                }
                .info-body{
                    font-size: 12px;
                }
            }
        }
    }
}


</style>
