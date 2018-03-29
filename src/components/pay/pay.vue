<template>
  <div>
    <div class="content" id="box" v-if="unpaid">
        <div class="success_header">
            <div class="success_header_logo" v-if="data.logo">
                <img :src="data.logo" alt=""> 
            </div>
            <div class="success_header_log_no" v-else></div>
            <div class="success_header_t">向{{ data['company'] }}付款</div>
        </div>
        <div class="success_amount_b" v-if="withoutmoney">
            <div class="success_amount_num" >
                <p>消费总额</p>
                <span class="">￥</span>
                <input type="number" class="money"  v-model="money">
            </div>
        </div>
        <div class="success_amount_title" v-else>
            <span class="money">￥{{data.money}}</span>
        </div>
        <input class="remark"  placeholder="付款备注" v-model="remark">
        <div class="post" @click="pay()">
            <span>支付</span>
        </div>
    </div>
    <!--支付成功  -->
    <div class="success_content" id="box" v-else>
        <div class="success_header">
            <div class="success_header_logo" v-if="data.logo">
                <img :src="data.logo" alt=""> 
            </div>
            <div class="success_header_log_no" v-else></div>
            <div class="success_header_t">{{ data['company'] }}</div>
        </div>
        <div class="success_amount_b">
            <div class="success_amount_num">
                <span class="success_amount_num_price">¥</span>
                <span class="success_amount_num_price">{{data['money']}}</span>
            </div>
            <div class="success_amount_title">
                <span class="success_amount_title_logo"></span><span style="color: #303570">
                    付款成功
                </span>
            </div>
        </div>
        <div class="success_info">
            <ul>
                <li>
                    <div class="success_info_right fr">{{ billdata['body'] }}</div>
                    <div class="success_info_left">商品信息</div>
                </li>
                <li>
                    <div class="success_info_right fr">{{billdata['createdAt'] }}</div>
                    <div class="success_info_left">创建时间</div>
                </li>
                <li>
                    <div class="success_info_right fr">{{ billdata['outTradeNo'] }}</div>
                    <div class="success_info_left">订单号</div>
                </li>
                <li>
                    <div class="success_info_right fr">{{ data['company'] }}</div>
                    <div class="success_info_left">收款商户</div>
                </li>
            </ul>
        </div>
    </div>
  </div>
    
</template>
<script>
import swal from 'sweetalert2'
import {getPayInfo, postPayData} from '@/api/pay'
export default {
  name: 'pay',
  data () {
    return {
      data: {
        logo: '',
        money: '',
      },
      billdata: {},
      withoutmoney: true,
      money: '',
      channel: 'wx',
      status: '',
      code: '',
      remark: '',
      unpaid: true
    }
  },
  created () {
    document.getElementsByTagName('html')[0].style.background = 'rgb(242, 240, 243)'
    var ua = window.navigator.userAgent.toLowerCase()
    // 判断是不是微信
    if (ua.match(/MicroMessenger/i)) {
      this.channel = 'wx'
    } else if (ua.match(/AlipayClient/i)) {
      this.channel = 'ap'
    } else {
    // 哪个都不是
      swal({
        position: 'center',
        type: 'error',
        text: '请用微信或者支付宝扫码付款',
        showConfirmButton: false,
        width: '70%',
        timer: 1000
      })
    }
    this.code = this.$route.query.code ? this.$route.query.code : this.$route.query.auth_code
    this.state = this.$route.query.state
    // alert('code:' + (this.$route.query.code ? this.$route.query.code : this.$route.query.auth_code) + '，state：' + this.state + '，channel:' + this.channel)
    this.getPayInfo()
  },
  methods: {
    getPayInfo () {
      var data = {
        state: this.state,
        code: this.code,
        channel: this.channel
      }
      data = JSON.stringify(data)
      getPayInfo(data).then(res => {
        if (res) {
          console.log(res)
          this.data = res.data
          if (res.data.money) {
            this.data.money = this.data.money / 100
            this.withoutmoney = false
          }
        } else {
          swal({
            position: 'center',
            type: 'error',
            text: '网络错误',
            showConfirmButton: false,
            width: '70%',
            timer: 1000
          })
        }
      })
    },
    pay () {
      let paydata = {
        state: this.state,
        channel: this.channel,
        openId: this.data.openId,
        money: this.data.money ? this.data.money : this.money * 100,
        remark: this.remark
      }
      paydata = JSON.stringify(paydata)
      postPayData(paydata).then(res => {
        if (res.status === 200) {
          console.log(res)
          // alert(JSON.stringify(res))
          this.billdata = res.data
          let that = this
          if (this.channel === 'ap') {
            var alipayinfo = JSON.parse(res.data.payInfo)
            // alert('tradeNO：' + alipayinfo.tradeNO)
            AlipayJSBridge.call('tradePay', {'tradeNO': alipayinfo.tradeNO}, function (result) {
              // alert(JSON.stringify(result))
              if (result.resultCode === '9000') {
                that.unpaid = false
                // location.href = '{{ success_url }}?data=' + encodeURI(JSON.stringify(this.data))
              }
            })
          } else {
            var payurl = res.data.payurl
            var payinfo = res.data.payInfo
            if (payinfo != null) {
              var wxinfo = JSON.parse(payinfo)
              this.data.channel = res.data.channel
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  'appId': wxinfo.appId, //公众号名称，由商户传入
                  'timeStamp': wxinfo.timeStamp, //时间戳，自1970 年以来的秒数
                  'nonceStr': wxinfo.nonceStr, //随机串
                  'package': wxinfo.package,
                  'signType': wxinfo.signType, //微信签名方式:
                  'paySign': wxinfo.paySign  //微信签名,
                }, function (res) {
                  // alert(JSON.stringify(res))
                  if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    // 此处可以使用此方式判断前端返回,微信团队郑重提示：res.err_msg 将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    that.unpaid = false
                    // location.href = '{{ success_url }}?data=' + encodeURI(JSON.stringify(this.data))
                  }
                }
              )
            } else {
              location.href = payurl
            }
          }
        } else {
          swal({
            position: 'center',
            type: 'error',
            text: '网络错误',
            showConfirmButton: false,
            width: '70%',
            timer: 1000
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../assets/mixin.stylus"
  html,body{
      background #666
  }
  .content{
    //   background #fff
      padding 1.5rem .5rem
      .success_header{
        padding .2rem 0
        text-align center
        .success_header_logo{
            margin .1rem auto .5rem
            width 2rem
            height 2rem
            background-size 100%
            //  border-radius 50%
            img{
              width 100%
              //  border-radius 50%
            }
        }
        .success_header_log_no{
            margin .1rem auto .5rem
            width 2rem
            height 2rem
            bg-image('img/success')
            background-size 100%
            //  border-radius 50%
        }
        .success_header_t{
          font-dpr(20px)
          margin .6rem 0
        }
    }
    .success_amount_b{
        padding .5rem
        margin-top 1rem
        background #fff
        border-radius .3rem
        color #666
        line-height .7rem
        .success_amount_num{
            p{
              font-dpr(15px)
            }
            span{
              font-dpr(30px)
            }
            input{
              width 5rem
              font-dpr(40px)
              background transparent
            }
        }
        
    }
    .success_amount_title{
        text-align center
        font-dpr(30px)
    }
    .remark{
        text-align right 
        color #8698e8
        margin .1rem .2rem 1rem 0
        width 100%
        background transparent
    }
    .remark::-webkit-input-placeholder{
      color #8698e8
    }
    .post{
        background #566fe0
        width 90%
        padding .3rem 
        text-align center
        color #ffffff
        margin 0 auto
        border-radius .2rem
        fon-dpr(30px)
    }
  }
// 支付成功
  .success_content{
      background #fff
      padding .5rem
      .success_header{
        padding .2rem 0
        border-bottom 1px solid #999
        text-align center
        .success_header_logo{
            margin .1rem auto .5rem
            width 2rem
            height 2rem
            background-size 100%
            //  border-radius 50%
            img{
              width 100%
              //  border-radius 50%
            }
        }
        .success_header_log_no{
          margin .1rem auto .5rem
          width 2rem
          height 2rem
          bg-image('img/success')
          background-size 100%
          //  border-radius 50%
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

