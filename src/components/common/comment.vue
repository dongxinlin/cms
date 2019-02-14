<template>
    <div class="comment-template">
        <h3>发表评论</h3>
        <hr>
         <textarea  class="content" cols="30" rows="5" placeholder="请输入您要评论的内容"></textarea>
        <mt-button class="primary" type="primary">发表评论</mt-button>
        <ul class="critic">
            <li>
                <p class="critic-pl">评论永辉</p>
                <p class="critic-nr">评论内容</p>
            </li>
        </ul>
        <mt-button class="default" type="default">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    
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
        .critic{
            margin-top: 10px;
            .critic-pl{
                background-color: #ccc;
                font-size: 16px;
                line-height: 35px;
            }
            .critic-nr{
                text-indent: 2em;
            }
        }
        .default{
            width: 100%;
            border: 1px solid red;
            color: red;
        }
    }
</style>
