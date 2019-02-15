<template>
    <div class="comment-template">
        <h3>发表评论</h3>
        <hr>
         <textarea class="content" cols="30" rows="5" maxlength="120" placeholder="请输入您要评论的内容" v-model="content"></textarea>
        <mt-button class="primary" type="primary" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
        <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
            <div class="cmt-title">
            第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
            </div>
                <div class="cmt-body">
                {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                </div>
            </div>
        </div>
        <mt-button class="default" @click="getMore" type="default">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            pageindex:1, //评论的页数
            comments:[],
            content:''
        }
    },
    created(){
        this.getComments()
    },
    methods:{
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(res=>{
                if(res.body.status===0){
                    this.comments=this.comments.concat(res.body.message);
                }else{
                    Toast('获取评论信息失败')
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getComments()
        },
        postComment(){
            this.$http.post('api/postcomment/'+this.id,{content:this.content}).then(res=>{
                if(res.body.status===0){
                    // 重置才能看到发表的消息
                    this.pageindex=1
                    this.comments=[]
                    this.getComments()
                    this.content=''
                    Toast('提交成功')
                }else{
                    Toast('提交消息失败')
                }
            })
        },   
    },
    props:["id"],
}
</script>

<style lang="less" scope>
    .comment-template{
        h3{
            font-size: 16px;
            font-weight: 1000;
        }
        .content{
            margin-bottom: 0;
        }
        .primary{
            width: 100%;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
            font-size: 13px;
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
            }
        }
        .default{
            width: 100%;
            border: 1px solid red;
            color: red;
        }
    }
</style>
