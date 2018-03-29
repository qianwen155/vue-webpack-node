<template>
  <div class="checkingDetail">
    <div class="title">
      <p>•</p>
      <p>{{mid | monthFi}}</p>
      <p>{{totalNumber}}笔</p>
      <p>{{totalMoney}}元</p>
    </div>
    <!--<div class="space"></div>-->
    <div class="list">
      <ul>
        <li @click="toDetail(record.voucherType,record.voucherId)" v-for="record in monthlyDetail">
          <div class="l-border"></div>
          <div class="B-border"></div>
          <div class="C-icon" v-bind:class="voucherBg[record.voucherType]"></div>
          <div class="content">
            <P>￥{{record.money}}</P>
            <P>{{record.voucherType | voucherTypeFilter}}</P>
            <P>{{record.updatedAt.slice(5,-9)}}</P>
            <P v-bind:style="{'color': statusColor[record.status]}">{{record.status | statusFilter}}</P>
          </div>
          <span></span>
        </li>
      </ul>
      <div class="spinner" v-if="loading">
        <div class="spinner-container container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
      </div>
      <div class="ismore" v-if="!ismore">
        <p>没有更多了...</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getMonthlyDetail, getAccountList} from '@/api/checking'
  import swal from 'sweetalert2'
  export default {
    name: 'checkingDetail',
    data () {
      return {
        sign: '',
        monthlyDetail: [],
        mid: '',
        totalNumber: '',
        totalMoney: '',
        page: 0,
        ismore: true,
        loading: false,
        statusColor: {
          'WITHDRAWAL_PENDING': '#de8c02',
          'O2O_GATHERED_UNSETTLED': '#01a403',
          'WITHDRAWAL_SUCCESS': '#01a403',
          'O2O_GATHERED_SUCCESS': '#01a403',
          'O2O_GATHERED_FAIL': '#b90219',
          'WITHDRAWAL_REJECTED': '#b90219',
          'TRANSFER_SUCCESS': '#01a403'
        },
        voucherBg: {
          'WITHDRAWAL': 'withdawal',
          'O2O_GATHERING': 'gathering',
          'TRANSFER': 'carryover'
        }
      }
    },
    created () {
      this.mid = this.$route.params.mid
      this.totalNumber = this.$route.params.totalNumber
      this.totalMoney = this.$route.params.totalMoney
      getMonthlyDetail(this.mid).then(res => {
        if (res.data.code === 200) {
          this.monthlyDetail = res.data.data.records
//          console.log(res.data)
        } else {
          swal({
            position: 'center',
            type: 'error',
            title: '网络错误',
            showConfirmButton: false,
            width: '6rem',
            timer: 3000
          })
        }
      })
      let that = this
      window.addEventListener('scroll', function () {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight && that.ismore) {
          that.page ++
          that.loading = true
          that.getAccountList()
          console.log(that.page, '加载中。。。')
        }
      }, false)
    },
    filters: {
      monthFi: function (value) {
        let as = value.split('')
        as.splice(4, 0, '.')
        return as.join('')
      },
      voucherTypeFilter (value) {
        let voucherType = ''
        switch (value) {
          case 'WITHDRAWAL':
            voucherType = '提现'
            break
          case 'O2O_GATHERING':
            voucherType = '收款'
            break
          case 'TRANSFER':
            voucherType = '转账'
            break
          default:
            break
        }
        return voucherType
      },
      statusFilter (value) {
        let status = ''
        switch (value) {
          case 'WITHDRAWAL_PENDING':
            status = '待处理'
            break
          case 'O2O_GATHERED_UNSETTLED':
            status = '待结算'
            break
          case 'WITHDRAWAL_SUCCESS':
            status = '已提现'
            break
          case 'O2O_GATHERED_SUCCESS':
            status = '已结算'
            break
          case 'O2O_GATHERED_FAIL':
            status = '结算失败'
            break
          case 'WITHDRAWAL_REJECTED':
            status = '驳回'
            break
          case 'TRANSFER_SUCCESS':
            status = '转账成功'
            break
          default:
            break
        }
        return status
      }
    },
    methods: {
      toDetail (type, vid) {
        if (type === 'WITHDRAWAL') {
          this.$router.push('/transferdetail/' + vid)
        } else if (type === 'O2O_GATHERING') {
          this.$router.push('/gatherdetail/' + vid)
        } else {
          this.$router.push('/carryoverdetail/' + vid)
        }
      },
      getAccountList () {
        getAccountList(this.mid, this.page).then(res => {
          if (res.data.data.records) {
            this.monthlyDetail = this.monthlyDetail.concat(res.data.data.records)
          } else {
            this.loading = false
            this.ismore = false
          }
//          console.log(res)
        })
      }
    },
    beforeDestroy () {
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../assets/mixin.stylus"

  * {
    set-font-family()
  }
  .checkingDetail{
    .title{
      background-color: #ffffff
      z-index 500
      position fixed
      width: 95%;
      top 0
      border-bottom 0.02rem solid #efefef;
      margin-left 3%;
      height: 1.5rem;
      line-height 1.5rem
      font-size 0.43243243243243246rem;
      color #5a5a5a;
      font-weight bold
      p:nth-child(1){
        display inline-block;
        color #e4e4e4;
        font-size 0.35rem;
        position relative;
        top 0.72rem;
      }
      p:nth-child(2){
        margin-left 1.1rem;
        display inline-block;
        line-height 0.8108108108108109rem;
        margin-right 1.1rem;
      }
      p:nth-child(3){
        display inline-block;
      }
      p:nth-child(4){
        width: 3.5rem;
        text-overflow: ellipsis;
        overflow: hidden;
        float right ;
        text-align center;
        white-space: nowrap;
      }
    }
    .space{
      width: 0.2rem
      height: 0.8rem
      background-color: #ffffff
      position absolute
      left 0.8rem
      z-index 200
    }
    .list{
      ul{
        margin-top 1.6rem
        li {
          height: 1.9rem
          position relative
          .l-border {
            height 2.1621621621621623rem
            border-left: 1px solid #e7e7e7
            position absolute
            left 0.9rem
          }
          .B-border {
            width: 7.5675675675675675rem
            border-bottom: 1px solid #e7e7e7
            position absolute
            top 2.1621621621621623rem
            left 1.8108108108108107rem
          }
          .C-icon {
            width: 0.8918918918918919rem
            height: 0.8918918918918919rem
            bg-image('images/transfer')
            background-size: 100%
            position absolute
            left 0.4594594594594595rem
            top 0.83513513513513514rem
          }
          .withdawal{
            bg-image('images/transfer')
          }
          .gathering{
            bg-image('images/gathering')
          }
          .carryover{
            bg-image('images/loanget')
          }
          .content {
            width: 7.5675675675675675rem
            height: 1.054054054054054rem
            position absolute
            left 1.8108108108108107rem
            top 0.5945945945945946rem
            p:nth-child(1){
              margin-right: 0.5rem
              font-size 0.4rem
              float: right
              color #727272
            }
            p:nth-child(2){
              margin-bottom: 0.13333rem;
              font-size 0.4rem
              color #5a5a5a
            }
            p:nth-child(3){
              font-size: 0.37333rem;
              color: #c9c9c9
            }
            p:nth-child(4){
              width: 2.1rem
              text-align right
              position: relative;
              font-size 0.35rem
              left: 5rem;
              bottom: 0.5rem;
              display: inline-block
            }
          }
          span {
            float right
            width: 0.4rem
            height: 0.5rem
            bg-image('images/chevron')
            background-size: auto 100%
            position relative
            top 0.9rem
            right 0.4rem
          }
        }
      }
      .spinner {
        margin: 0.4rem auto;
        width: 0.7rem;
        height: 0.7rem;
        position: relative;
        .spinner-container {
          position: absolute;
          width: 100%;
          height: 100%;
          div{
            width: 0.2rem;
            height: 0.2rem;
            background-color: #adadad;
            border-radius: 100%;
            position: absolute;
            -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
            animation: bouncedelay 1.2s infinite ease-in-out;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }
          .circle1 { top: 0; left: 0; }
          .circle2 { top: 0; right: 0; }
          .circle3 { right: 0; bottom: 0; }
          .circle4 { left: 0; bottom: 0; }
        }
        .container1{
          .circle2 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
          }
          .circle3 {
            -webkit-animation-delay: -0.6s;
            animation-delay: -0.6s;
          }
          .circle4 {
            -webkit-animation-delay: -0.3s;
            animation-delay: -0.3s;
          }
        }
        .container2 {
          -webkit-transform: rotateZ(45deg);
          transform: rotateZ(45deg);
          .circle1 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
          }
          .circle2 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
          }
          .circle3 {
            -webkit-animation-delay: -0.5s;
            animation-delay: -0.5s;
          }
          .circle4 {
            -webkit-animation-delay: -0.2s;
            animation-delay: -0.2s;
          }
        }
        .container3 {
          -webkit-transform: rotateZ(90deg);
          transform: rotateZ(90deg);
          .circle1 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
          }
          .circle2 {
            -webkit-animation-delay: -0.7s;
            animation-delay: -0.7s;
          }
          .circle3 {
            -webkit-animation-delay: -0.4s;
            animation-delay: -0.4s;
          }
          .circle4 {
            -webkit-animation-delay: -0.1s;
            animation-delay: -0.1s;
          }
        }
      }
      @-webkit-keyframes bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
  }

  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 40% {
    transform: scale(1.0);
  -webkit-transform: scale(1.0);
  }
  }
      .ismore{
        margin .3rem
        font-size 0.4rem
        text-align center
        color #a7a7a7
      }
    }
  }
</style>
