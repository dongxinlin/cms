<template>
    <div class="good-list-container">
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="skip(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price"><span class="now">¥{{item.market_price}}</span><span class="old">¥{{item.sell_price}}</span></p>
                <p class="sell"><span>热卖中</span><span>剩{{item.stock_quantity}}件</span></p>
            </div>
        </div>
        <mt-button size="large"  type="danger" @click="getMore()">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex:1,
            goodsList:[]
        }
    },
    created(){
        this.getGoodList()
    },
    methods: {
        getGoodList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(res=>{
                if(res.body.status===0){
                    this.goodsList=this.goodsList.concat(res.body.message)
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodList()
        },
        skip(id){
            this.$router.push('/home/goodsInfo/'+id)
        }
    },
}
</script>

<style lang="less" scoped>
    .good-list-container{
        padding: 7px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            padding: 2px;
            box-shadow: 0 0 7px #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            margin-bottom: 5px;
            img{
                display: block;
                width: 100%;
            }
            .title{
                font-size: 13px;
                font-weight: 700;
            }
            .info{
                p{
                    margin: 0;
                    padding: 0;
                }
                .now{
                    font-size: 16px;
                    color: red;
                    font-weight: 700;
                    margin: 0 10px;
                }
                .old{
                    font-size: 12px;
                    margin-left: 10px;
                    text-decoration: line-through;
                }
                .sell{
                    font-size: 13px;
                    padding: 5px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        
    }
</style>
