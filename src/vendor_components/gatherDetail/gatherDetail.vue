<template>
  <div class='about-us'>
    <div class="about-logo">
      <div v-if="this.transferdetail.status === 'O2O_GATHERED_SUCCESS'" class="icon"></div>
      <div v-else-if="this.transferdetail.status === 'O2O_GATHERED_UNSETTLED'" class="icon icon-unsettled"></div>
      <div v-else class="icon icon-fail"></div>
      <span v-if="this.transferdetail.status === 'O2O_GATHERED_SUCCESS'">已结算</span>
      <span v-else-if="this.transferdetail.status === 'O2O_GATHERED_UNSETTLED'" style="color: #e4a233">待结算</span>
      <span v-else style="color: #b90219">结算失败</span>
      <p> ￥{{transferdetail.money}}</p>
    </div>

    <div class='detail'>
        <div class="detail-logo">
          <p class="list1">
            <span>账户名</span>
            <span>{{transferdetail.relationName}}</span>
          </p>
          <!-- <p class="list1">
            <span>账户号</span>
            <span>{{transferdetail.relationAccount}}</span>
          </p> -->
          <p class="list1">
            <span>备注</span>
            <span>{{transferdetail.description}}</span>
          </p>
          <p class="list1">
            <span>创建时间</span>
            <span>{{transferdetail.createdAt}}</span>
          </p>
          <p class="list1">
            <span>订单号</span>
            <span>{{transferdetail.voucherId}}</span>
          </p>
          <p class="list1" v-if="done">
            <span>结算时间</span>
            <span>{{transferdetail.finishedAt}}</span>
          </p>
        </div>
        <!-- <div class="dot">
            <span class="item dot-right"></span>
            <span class="item dot-left"></span>
        </div>
        <div class="detail-info">
        <div class="detail-body">
            <img src="http://www.w3cplus.com/sites/default/files/blogs/2015/1511/yiboqr.png" alt="">
        </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import {getTransferDetail} from '@/vendor_api/transfer'
import swal from 'sweetalert2'
export default {
  name: 'vendor_gatherdetail',
  components: {
  },
  data () {
    return {
      done: true,
      transferdetail: {}
    }
  },
  created () {
    this.vid = this.$route.params.vid
    getTransferDetail(this.vid).then(res => {
      if (res.data.code === 200) {
        this.transferdetail = res.data.data
        // if (this.transferdetail.status === 'O2O_GATHERED_UNSETTLED') {
        //   this.done = false
        // }
        // if (this.transferdetail.status === 'O2O_GATHERED_SUCCESS') {
        //   this.done = true
        // }
        console.log(res)
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
  background-color: #f4f5f6
  .about-logo
    text-align center
    padding 1.26667rem 0.3rem 1rem
    margin-bottom .3rem
    background #ffffff
    height: 5rem
    .icon
      width: 1.44rem
      height: 1.44rem
      bg-image('images/settlement')
      background-size:100%
      display inline-block
    .icon-unsettled{
      bg-image('images/pending')
    }
    .icon-fail{
      bg-image('images/bitmap')
    }
    span
      display block
      color #36b536

    p {
      font-size 0.8rem
      color #4f4f4f
    }

  .detail
    position relative
    background #ffffff
    overflow hidden
    padding 0 0.3rem
   .detail-logo
     padding .526667rem 0.5rem
     /*border-bottom-style none*/
    .list1{
      margin-bottom: 0.2rem
      span:nth-child(1){
        font-size 0.45rem
        color #6a6a6a
      }
      span:nth-child(2){
        letter-spacing 0.02rem
        font-size 0.4rem
        color #a7a7a7
        float right
      }
    }
/*.dot
    position relative
    border 2px dashed #cdcfe5
    .dot-right
        display: inline-block;
        width: .3rem;
        height: .3rem;
        border: 1px solid #cccee3;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        float: left;
        left: -0.15rem;
        top: -0.15rem;
        position: absolute;
        background: #f6f6f6;
        border-left: none;
        border-bottom: navajowhite;
    .dot-left
        display: inline-block;
        width: .3rem;
        height: .3rem;
        border: 1px solid #cccee3;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        float: right;
        right: -0.15rem;
        top: -0.15rem;
        position: absolute;
        background: #f6f6f6;
        border-right: none;
        border-top: navajowhite;
  .detail-info
    text-align center
    padding 0.5rem
    border 2px solid #cccee3
    border-top none
    .detail-title
      font-dpr(16px)
      margin-bottom .4rem
      @media screen and (device-width: 320px)
        font-dpr(14px)
    .detail-body
      font-dpr(16px)
      text-align center
      @media screen and (device-width: 320px)
        font-dpr(14px)
      img
        width 3rem */
</style>
