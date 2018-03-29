<template>
    <div class="content" id="box">
        <div class="success_header">
            <div class="success_header_logo" v-if="data['logo']" v-bind:style="{background: 'url('+data['logo']+') center no-repeat; background-size: 3rem 3rem'}"></div>
            <div class="success_header_log_no" v-else></div>
            <div class="success_header_t">{{ data['mchName'] }}</div>
        </div>
        <div class="success_amount_b">
            <div class="success_amount_num">
                <span class="success_amount_num_price">¥</span>
                <span class="success_amount_num_price">{{data['money'] / 100}}</span>
            </div>
            <div class="success_amount_title">
                <span class="success_amount_title_logo"></span><span style="color: #303570">
                    {{ data['body'] }}
                </span>
            </div>
        </div>
        <div class="success_info">
            <ul>
                <li>
                    <div class="success_info_right fr">{{ data['dsc'] }}</div>
                    <div class="success_info_left">商品信息</div>
                </li>
                <li>
                    <div class="success_info_right fr">{{data['time'] }}</div>
                    <div class="success_info_left">创建时间</div>
                </li>
                <li>
                    <div class="success_info_right fr">{{ data['outTradeNo'] }}</div>
                    <div class="success_info_left">订单号</div>
                </li>
                <li>
                    <div class="success_info_right fr">{{ data['vendor'] }}</div>
                    <div class="success_info_left">收款商户</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'success',
  data () {
    return {
      data: {
        logo: '',
        mchid: '',
        mchName: '陶志辉',
        body: '付款成功',
        money: '',
        mchNo: '',
        outTradeNo: '123',
        time: '2017-12-12',
        dsc: '信息',
        vendor: '乐行'
      }
    }
  },
  created () {
    document.getElementsByTagName('html')[0].style.background = 'rgb(242, 240, 243)'
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../assets/mixin.stylus"
  body,html{
      background #777
  }
  .content{
      background #fff
      padding .5rem
      .success_header{
        padding .2rem 0
        border-bottom 1px solid #999
        text-align center
        .success_header_log_no{
            margin .1rem auto .5rem
            width 2rem
            height 2rem
            bg-image('img/success')
            background-size 100%
        }
        .success_header_t{
          font-dpr(20px)
        }
    }
    .success_amount_b{
        text-align center
        border-bottom 1px solid #999
        padding .5rem 0
        .success_amount_num{
        font-dpr(40px)
        }
        .success_amount_title{
            .success_amount_title_logo{
            display inline-block
            width .5rem
            height .5rem
            bg-image('img/true')
            background-size 100%
            vertical-align middle
            }
        }
    }
    .success_info{
        padding .5rem  .1rem
        line-height .6rem
        color #666
        font-dpr(50px)
        .fr{
            float right 
        }
    }
  }
  
  
</style>

