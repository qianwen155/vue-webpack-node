<template>
  <div class='qrcode'>
    <div v-if="not_scanned">
      <div class="qrcode-logo">
        <p class="money">￥{{money/100}}</p>
        <!-- <p>交易单号 <span>{{orderId}}</span></p> -->
      </div>
      <div class="dot">
          <span class="item dot-right"></span>
          <span class="item dot-left"></span>
      </div>
      <div class="qrcode-info">
        <!--<div class="qrcode-title">乐盈车是车商的家</div>-->
        <div class="qrcode-body">
          <img :src="imgsrc" alt="">
        </div>
      </div>
    </div>
    <!--支付状态  -->
    <!-- <div class="about-logo" v-if="!not_scanned">
      <div v-if="paid" class="icon"></div>
      <div v-if="paying" class="icon icon-1"></div>
      <div v-if="close" class="icon icon-2"></div>
      <span v-if="paid">收款成功</span>
      <span v-if="paying" style="color: #e4a233">付款中</span>
      <span v-if="close" style="color: rgb(198, 58, 78)">付款失败</span>
      <p> ￥{{money/100}}</p>
      <div class="orderid">
        <span> 交易单号：{{orderId}}</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import swal from 'sweetalert2'
import { getQrcode } from '@/api/pay'
export default {
  name: 'qrcode',
  data () {
    return {
      vid: '',
      orderId: '',
      money: '',
      sign: '',
      imgsrc: '',
      not_scanned: true,
      paid: false,
      paying: false,
      close: false
    }
  },
  created () {
    this.vid = this.$route.query.vid
    this.orderId = this.$route.query.orderId
    this.money = this.$route.query.money
    this.sign = this.$route.query.sign
    if (!this.money) {
      swal({
        text: '获取金额失败',
        type: 'error',
        width: '70%',
        confirmButtonText: '确定'
      })
      return
    }
    let data = {
      vid: this.vid,
      orderId: this.orderId,
      money: this.money,
      sign: this.sign
    }
    this.getQrcode(data)
    // var url = 'https://pay.lexing360.com/v1/vendors/' + this.vid + '/qrcode?money=' + this.money + '&orderId=' + this.orderId
    // var xhr = new XMLHttpRequest()
    // var that = this
    // xhr.open('GET', url, true)
    // xhr.responseType = 'blob'
    // xhr.onload = function () {
    //   if (this.status === 200) {
    //     var blob = this.response
    //     console.log('二维码', this.response, window.URL.createObjectURL(blob))
    //     that.imgsrc = window.URL.createObjectURL(blob)
    //   } else {
    //     swal({
    //       text: '二维码获取失败',
    //       type: 'error',
    //       width: '70%',
    //       confirmButtonText: '确定'
    //     })
    //   }
    // }
    // xhr.send()
    // this.queryStatus()
  },
  computed: {
  },
  methods: {
    getQrcode (data) {
      getQrcode(data).then(res => {
        if (res.status === 200) {
          console.log(res)
          let blob = res.data
          console.log('二维码是', window.URL.createObjectURL(blob))
          this.imgsrc = window.URL.createObjectURL(blob)
        } else if (res.status === 403) {
          swal({
            text: '签名错误',
            type: 'error',
            width: '70%',
            confirmButtonText: '确定'
          })
        } else {
          swal({
            text: '获取二维码失败',
            type: 'error',
            width: '70%',
            confirmButtonText: '确定'
          })
        }
      })
    },
    queryStatus () {
      let url = 'https://pay.lexing360.com/v1/vendors/' + this.vid + '/billcheck/' + this.orderId
      let that = this
      let deadline = 0
      let timer = setInterval(function () {
        console.log('正在查询状态。。。', deadline)
        if (deadline === 90000) {
          clearInterval(timer)
          return
        }
        deadline = deadline + 1000
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onload = function () {
          if (this.status === 200) {
            if (JSON.parse(this.response).data.status !== 'NOT_SCANNED') {
              that.not_scanned = false
            }
            if (JSON.parse(this.response).data.status === 'PAID') {
              that.paid = true
              that.paying = false
              that.close = false
              clearInterval(timer)
            }
            if (JSON.parse(this.response).data.status === 'PAYING') {
              that.paid = false
              that.paying = true
              that.close = false
            }
            if (JSON.parse(this.response).data.status === 'CLOSED') {
              that.paid = false
              that.paying = false
              that.close = true
            }
          }
        }
        xhr.send()
      }, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/mixin.stylus"
.qrcode
  position relative
  padding 1rem
  .qrcode-logo
    text-align center
    padding .526667rem 0.5rem
    border 2px solid #bec0ce
    border-bottom-style none
    .money
      font-size 1rem
      color #353738
    span
      color rgb(180,180,180)
  .dot
    position relative
    border 2px dashed #bec0ce
    .dot-right
        display: inline-block;
        width: .25rem;
        height: .25rem;
        border: 2px solid #bec0ce;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        float: left;
        left: -0.15rem;
        top: -0.15rem;
        z-index: 999;
        position: absolute;
        background: #fff;
        border-left: none;
        border-bottom: navajowhite;
    .dot-left
        display: inline-block;
        width: .25rem;
        height: .25rem;
        border: 2px solid #bec0ce;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        float: right;
        right: -0.15rem;
        top: -0.15rem;
        z-index: 999;
        position: absolute;
        background: #fff;
        border-right: none;
        border-top: navajowhite;
  .qrcode-info
    text-align center
    padding 0.5rem
    border 2px solid #bec0ce
    border-top none
    .qrcode-title
      font-dpr(16px)
      margin-bottom .4rem
      @media screen and (device-width: 320px)
        font-dpr(14px)
    .qrcode-body
      font-dpr(16px)
      text-align center
      @media screen and (device-width: 320px)
        font-dpr(14px)
      img
        width 6rem
  .about-logo
    text-align center
    padding 1.26667rem 0 1rem
    margin-bottom .6rem
    background #ffffff
    height: 4rem
    .orderid{
      border-top 4px dashed #dddddd
      padding .6rem
      margin-top .8rem
      color #9c9c9c
    }
    .icon
      width: 1.44rem
      height: 1.44rem
      bg-image('../gatherDetail/images/settlement')
      background-size:100%
      display inline-block
    .icon-1{
      bg-image('../gatherDetail/images/pending')
    }
    .icon-2{
      bg-image('../transfer-detail/images/bitmap')
    }
    span
      display block
      // color #36b536

    p {
      font-size 0.8rem
      color #4f4f4f
    }
</style>
