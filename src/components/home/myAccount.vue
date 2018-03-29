<template>
  <div class="myAccount">
    <div class="banner">
      <div class="top">
        <button @click="copeAccount" style="display: none">复制</button>
        <p>{{accountArr.name}}</p>
        <input id="accountN" :value="accountArr.accountId" disabled="disabled"/>
      </div>
      <div class="bottom">
        <div class="money">
          {{accountArr.balance}}元
          <span style="display: none">？</span>
        </div>
        <div class="account">
          <div class="account-button" @click="tocheck">
            <div class="icon_check"></div>
            <p>对账</p> 
          </div>
          <div class="account-button" @click="totransfer">
            <div class="icon_transfer"></div>
            <p>提现</p>
          </div>
          <div class="account-button" @click="tocarryover">
            <div class="icon_carryover"></div>
            <p>转账</p> 
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <ul>
        <li v-for="(record, index) in accountlistArr" :key="index" @click="toDetail(record.voucherType,record.voucherId)">
          <div class="l-border"></div>
          <div class="B-border"></div>
          <div class="C-icon" v-bind:class="voucherBg[record.voucherType]"></div>
          <div class="content">
            <P>{{record.money}}</P>
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
    <div class="money-back" style="display: none">
    </div>
  </div>
</template>
<script>
  import {getAccountMsg, getAccountList} from '@/api/home'
  import swal from 'sweetalert2'
  // import { eventHub } from '@/utils/eventHub'
  export default {
    name: 'myAccount',
    data () {
      return {
        sign: '',
        pagesize: 20,
        page: 0,
        accountArr: [],
        accountlistArr: [],
        loading: false,
        ismore: true,
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
    beforeCreate () {
      localStorage.setItem('accesstoken', this.$route.query.accesstoken)
    },
    created () {
      document.body.style.background = '#fff'
      // let jwt = this.$route.params.jwt
      // sessionStorage.setItem('jwt', jwt)
      // eventHub.$emit('jwt', jwt)
      getAccountMsg().then(res => {
        if (res.data.code === 200) {
          this.accountArr = res.data.data
//          console.log(res)
        } else {
          console.log(res)
          if (res.data.code === 412) {
            swal({
              // title: res.data.message,
              text: res.data.message,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '马上去完善!',
              cancelButtonText: '取消!'
            }).then((result) => {
              if (result.value) {
                this.$router.push('/setPassword')
              }
            })
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
        }
      })
      this.getAccountList()
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
    methods: {
      copeAccount () {
        var accountN = document.getElementById('accountN')
        accountN.select()
        document.execCommand('Copy')   // 执行浏览器复制命令
      },
      totransfer () {
        this.$router.push('/transfer')
      },
      tocheck () {
        this.$router.push('/checking')
      },
      tocarryover () {
        this.$router.push('/carryover')
      },
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
        getAccountList(this.page).then(res => {
          if (res.data.code === 200 && res.data.data.records) {
            this.accountlistArr = this.accountlistArr.concat(res.data.data.records)
          } else {
            this.ismore = false
            this.loading = false
          }
//          console.log(res)
        })
      }
    },
    computed: {
      getStatus: function (status) {
        let statuscolor = ''
        switch (status) {
          case 'WITHDRAWAL_PENDING':
            statuscolor = 'red'
            break
          case 'O2O_GATHERED_UNSETTLED':
            statuscolor = 'red'
            break
          case 'WITHDRAWAL_SUCCESS':
            statuscolor = '#ddd'
            break
          case 'WITHDRAWAL_REJECTED':
            statuscolor = '#ddd'
            break
          case 'O2O_GATHERED_SUCCESS':
            statuscolor = '#ddd'
            break
          default:
            break
        }
        return statuscolor
      }
    },
    filters: {
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
    beforeDestroy () {
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/mixin.stylus"


  * {
    set-font-family()
    margin: 0
    padding: 0
    border: none
    box-sizing: border-box;
    /*清除移动端设备默认的点击高亮效果*/
    -webkit-tap-highlight-color: transparent;
  }
  .mint-spinner-snake{
    width 1rem
    height 1rem
  }
  .myAccount{
    height 100%
    background-color: #ffffff
    .banner{
      background-color: #575fb6
      width: 100%
      .top{
        margin-left:0.918918918918919rem
        border-bottom:1px solid #8a90cc
        padding-top 0.9459459459459459rem
        button{
          width: 1.2432432432432432rem
          height: 0.6756756756756757rem
          border: 1px solid #51c1e5
          background-color: #575fb6
          color #53d5ff
          font-size 0.43243243243243246rem
          float right
          margin-right:0.6486486486486487rem
          border-radius 0.16216216216216217rem
        }
        p{
          color #ffffff
          font-size 0.43243243243243246rem
          margin-bottom:0.40540540540540543rem
        }
        input{
          color #ffffff
          background none
          width 90%
          font-size 0.43243243243243246rem
          margin-bottom:0.40540540540540543rem
        }
      }
      .bottom{
        .money{
          margin-top: 0.4216216216216216rem
          font-size 0.6648648648648649rem
          color #ffffff
          margin-left 0.918918918918919rem
          span{
            width: 0.4rem
            height: 0.4rem
            line-height 0.45rem
            border-radius 0.2rem
            background-color: #ffffff
            color #6a71be
            font-size 0.35rem
            display inline-block
            position relative
            font-weight bold
            top -0.43243243243243246rem
            padding-left:0.11rem
          }
        }
        .account{
          display: flex;
          justify-content: space-around
          padding-bottom: .6rem
          .account-button{
            // width: 3.972972972972973rem
            height: 1.0810810810810811rem
            text-align center
            color #ffffff
            font-size 0.4243243243243246rem
            margin-top:0.6216216216216216rem
            margin-bottom:0.32432432432432434rem
            border-radius 0.16216216216216217rem
            text-align -webkit-center
            .icon_check{
              width: 0.8rem;
              height: 0.8rem;
              bg-image('images/check');
              background-size: 100% ;
            }
            .icon_transfer{
              width: 0.8rem;
              height: 0.85rem;
              bg-image('images/transfericon');
              background-size: 100% ;
            }
            .icon_carryover{
              width: 0.8rem;
              height: 0.8rem;
              bg-image('images/gather');
              background-size: 100% ;
            }
          }
        }
      }
    }
    .list{
      height: 2.1621621621621623rem
      li {
        height: 2.1621621621621623rem
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
          bg-image('images/gathering')
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
            width: 2rem
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
            border-radius: 0.2rem;
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
    .money-back{
      width: 1.9189189189189189rem
      height: 1.864864864864865rem
      bg-image('images/gathering')
      background-size: 100%
      position fixed
      right 1.2162162162162162rem
      bottom 0.6756756756756757rem
    }
  }
</style>