<template>
    <div class="goods-info-container">
    <transition @before-enter="beforeEnter"  @enter="enter" @after-enter="afterEnter">
        <span class="globule" ref="ball"  v-show="ballFlag"></span>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
         <mt-swipe  :auto="4000" >
            <mt-swipe-item v-for="item in pictureList" :key="item.src"><a href="#"><img :src="item.src" ></a></mt-swipe-item>
         </mt-swipe>
       </div>
     </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsGetdesc.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p class="price">
                <span class="market-price">市场价:&nbsp;&nbsp;<em>￥{{goodsGetdesc.market_price}}</em></span> <span class="sales-price">销售价:&nbsp;&nbsp;<em>¥{{goodsGetdesc.sell_price}}</em></span>
            </p>
            <div class="quantity">
                <span>购买数量:</span>
                <input type="button" value="-" :disabled="number<=1" @click="number >= 2 && number--" >
                <input type="number" v-model="number" @change="quantity()">
                <input type="button" value="+" :disabled="number>=goodsGetdesc.stock_quantity" @click="number < goodsGetdesc.stock_quantity && number++">
            </div>
            <div class="payment">
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            </div>
       </div>
     </div>
    </div>

    
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
           <p>商品货号：{{goodsGetdesc.goods_no}}</p>
           <p>库存情况：{{goodsGetdesc.stock_quantity}}件</p>
           <p>上架时间：{{goodsGetdesc.add_time | dateFormat }}</p>
       </div>
     </div>
     <div class="mui-card-foote">
         <mt-button class="myBtn" type="primary" size="large" plain @click="introduce(id)">图文介绍</mt-button>
         <mt-button type="danger" size="large" plain @click="goodsComment(id)">商品评论</mt-button>
     </div>
    </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            id:this.$route.params.id,
            pictureList:[],
            goodsGetdesc:{},
            number:1,
            ballFlag:false
        }
    },
    created(){
        this.getSlideshow()
        this.getdesc()
    },
    methods: {
      getSlideshow(){
          this.$http.get('api/getthumimages/'+this.id).then(res=>{
              if(res.body.status===0){
                  this.pictureList=res.body.message
              }
          })
      },
     // api/goods/getdesc/:id
      getdesc(){
          this.$http.get('api/goods/getinfo/'+this.id).then(res=>{
              if(res.body.status===0){
                  this.goodsGetdesc=res.body.message[0]
              }
          })
      },

      introduce(id){
          this.$router.push('/home/goodsDesc/'+this.id)
      },

      goodsComment(id){
          this.$router.push('/home/goodsComment/'+this.id)
      },
      quantity(){
          if(this.number>this.goodsGetdesc.stock_quantity){
              this.number=this.goodsGetdesc.stock_quantity
          }else if(this.mumber<1){
              this.number=1
          }
      },

      addToShopCar(){
        this.ballFlag=!this.ballFlag 
      },

    //   钩子动画
       beforeEnter(el){
        el.style.transform="translate(0,0)"
        
       },
       enter: function (el, done) {
        el.offsetWeight;
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition= document.getElementById('shopcar').getBoundingClientRect();

        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;

        el.style.transform=`translate(${xDist}px,${yDist}px)`
        el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)"
        done()
       },
       afterEnter: function (el) {
        this.ballFlag=!this.ballFlag
       },
    },
    
}
</script>

<style lang="less" scoped>
.goods-info-container{
    .mint-swipe{
        height: 200px;
        img{
            height: 100%;
            width: 100%;
        }
    }
    .price{
        .market-price{
            em{
                text-decoration: line-through;
            }
        }
        .sales-price{
            margin-left: 10px;
            em{
                color: red;
                font-size: 16px;
                font-weight: 700;
            }
        }
    }
    .quantity{
        height: 30px;
        display: flex;
        line-height: 30px;
        span{
            margin-right: 20px;
        }
        input{
            margin: 0;
            padding: 0;
            width: 30px;
            height: 30px;
            text-align: center;
            &[type="number"]{
                border-left: none;
                border-right: none;
            }
        }
    }
    .payment{
        margin-top: 10px;
        
    }
    
    .mui-card-foote{
        border-top: 1px solid #ccc;
        padding: 15px;
        display: block;
        button{
            margin: 15px 0;
        }
    }

    .globule{
        position: absolute;
        left: 140px;
        top: 400px;
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        z-index: 99;
    }
}
    
</style>
