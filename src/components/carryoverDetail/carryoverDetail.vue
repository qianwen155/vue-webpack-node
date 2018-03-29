<template>
  <div class='about-us'>
    <div class="about-logo">
      <!-- <div class="top" v-if="payBack">
        <div class="icon icon1"></div>
        <p style="color:#cd4859">驳回</p>
        <p style="color:#cd4859">（{{transferdetail.rejectReason}}）</p>
      </div>
      <div class="top" v-if="pending1">
        <div class="icon icon2"></div>
        <p style="color:#e19616">待处理</p>
      </div> -->
      <div class="top">
        <div class="icon icon3"></div>
        <p style="color:#43ba44">转账成功</p>
      </div>
      <div class="money1">￥{{transferdetail.money}}</div>
    </div>
    <div class='detail'>
      <div class="detail-logo">
          <p class="head1">账户信息</p>
          <p>对方名称：{{transferdetail.relationName}}</p>
          <p>对方账号：{{transferdetail.relationAccount}}</p>
          <p v-if="transferdetail.description">备注：{{transferdetail.description}}</p>
          <p>金额：{{transferdetail.money}}</p>
          <p v-if="transferdetail.orderId">订单号：{{transferdetail.orderId}}</p>
        </div>
      <div class="dot"></div>
      <!-- <p class="list1" >
        <span>费率</span>
        <span>{{transferdetail.rate}}</span>
      </p> -->
      <p class="list1">
        <span>申请时间</span>
        <span>{{transferdetail.createdAt}}</span>
      </p>
      <p class="list1">
        <span>批次号</span>
        <span>{{transferdetail.voucherId}}</span>
      </p>
      <p class="list1">
        <span>账号</span>
        <span>{{transferdetail.accountId}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import {getCarryoverDetail} from '@/api/carryover'
import swal from 'sweetalert2'
export default {
  name: 'carryoverdetail',
  data () {
    return {
      transferdetail: {},
      payBack: false,
      pending1: false,
      settlement1: false
    }
  },
  created () {
    this.vid = this.$route.params.vid
    getCarryoverDetail(this.vid).then(res => {
      if (res.data.code === 200) {
        this.transferdetail = res.data.data
        // if (this.transferdetail.status === 'TRANSFER_REJECTED') {
        //   this.payBack = true
        // }
        // if (this.transferdetail.status === 'TRANSFER_PENDING') {
        //   this.pending1 = true
        // }
        if (this.transferdetail.status === 'TRANSFER_SUCCESS') {
          this.settlement1 = true
        }
//        console.log(res)
      } else {
        swal({
          position: 'center',
          type: 'error',
          text: res.data.message,
          showConfirmButton: false,
          width: '70%',
          timer: 3000
        })
      }
    })
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/mixin.stylus"
.about-us
  position relative
  padding 0 0.3rem
  .about-logo
    text-align center
    padding 1rem 0 0
    background #ffffff
    .top{
      .icon{
        width: 1.44rem
        height: 1.44rem
        background-size:100%
        margin:0 auto
        margin-bottom:0.1rem
      }
      .icon1{
        bg-image('images/bitmap')
      }
      .icon2{
        bg-image('images/pending')
      }
      .icon3{
        bg-image('images/settlement')
      }
      p{
        font-size 0.4rem
      }
    }
    .money1{
      font-size 0.8rem
      color #727272
    }
  .detail
    position relative
    height 100%
    background #ffffff
    overflow hidden
    padding .5rem
   .detail-logo
     text-align left
     padding .526667rem 0.5rem
     border 1px solid #a3abfe
     border-radius .2rem
     background #f2f3ff
     line-height .8rem
     color #434eb1
     font-size 0.43rem
     .head1{
       color #5f5f61
       font-size 0.39rem
       margin-bottom:0.1rem
     }
  .dot
    position relative
    border 1px solid #dddddd
    margin .5rem 0
  .list1{
    margin-bottom: 0.2rem
    span:nth-child(1){
      font-size 0.45rem
      color #6f6f6f
    }
    span:nth-child(2){
      font-size 0.4rem
      letter-spacing 0.02rem
      color #a7a7a7
      float right
    }
  }
</style>
