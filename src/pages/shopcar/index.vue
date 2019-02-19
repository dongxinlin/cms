<template>
    <div class="shop-car-container" >
        
    <div class="mui-card" v-for="(item,index) in shopList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner my-inner">
          <mt-switch @change="goodsStateChanged(item.id,$store.getters.goodsStateChanged[item.id])"
          :value="$store.getters.goodsStateChanged[item.id]"></mt-switch>
          <img class="picture" :src="item.thumb_path">
          <div class="info">
              <h1>{{item.title}}</h1>
              <div class="quantity">
                  <span>¥{{item.sell_price}}</span>
                  <input type="button" @click="zijian(item.id)" value="-">
                  <input type="number" :value="goodsCount[item.id]" >
                  <input type="button" @click="zijia(item.id)" value="+">
                  <a href="#" @click="removeGoods(item.id,index)">删除</a>
              </div>
          </div>
       </div>
     </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">    
        <div class="mui-card-content-inner account">
         <div>
            <p>总计 (不含运费)</p>
            <p>已勾选商品<span class="red">{{$store.getters.goodsCountAndAmount.count}}</span>件, 总价<span class="red">￥{{$store.getters.goodsCountAndAmount.amout}}</span></p>
         </div>
         <mt-button type="danger">去结算 </mt-button>
       </div>
     </div>
    </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsCount:this.$store.getters.carNumber,
            shopList:[],
        }
    },
    created(){
        this.getGoodsList()
    },
    methods: {
        // 初步渲染页面
        getGoodsList(){
            let goodsList=[]
            this.$store.state.car.forEach(element => goodsList.push(element.id))
            if(goodsList.length>0){
                this.$http.get('api/goods/getshopcarlist/'+goodsList.join(',')).then(res=>{
                    if(res.body.status===0){
                        this.shopList=res.body.message
                    }
                })
            }
            
        },

        // 自减
        zijian(id){
            this.goodsCount[id] > 1 &&  this.goodsCount[id]--;
            this.$store.commit('updateCount',{id,count:this.goodsCount[id]})
        },

        //自加
        zijia(id){
            this.goodsCount[id]++;
            this.$store.commit('updateCount',{id,count:this.goodsCount[id]})
        },
        // 删除
        removeGoods(id,index){
            this.shopList.splice(index,1);
            this.$store.commit('removedataCount',id)
        },
        goodsStateChanged(id,selected){
            this.$store.commit('updateSelected',{id,selected})
        }
    },
}
</script>

<style lang="less" scoped>
.shop-car-container{
    .my-inner{
        display: flex;
        align-items: center;
        .picture{
        width: 60px;
        height: 60px;
        }
        .info{
            display: block;
            h1{
                font-size: 14px;
                 font-weight: 700;
                line-height: 20px;
            }
            .quantity{
                display: flex;
                align-items: center;
                input{
                    padding: 0;
                    margin: 0;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    // line-height: 30px;
                    font-size: 14px;
                    &[type=number]{
                        border-right: none;
                        border-left: none;
                    }
                }
                span{
                    margin-right: 20px;
                    color: red;
                    font-weight: 700;
                }
                a{
                    margin-left: 20px;
                }
            }
        }      
    }
    .account{
        display: flex;
        justify-content: space-between;
        .red{
            font-size: 16px;
            color: red;
            margin: 0 5px;
            font-weight: 700;
        }
    }
}
</style>
