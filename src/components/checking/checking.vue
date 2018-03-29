<template>
<div class="checking">
  <!-- <div class="top">
    <div class="nub">
      <div class="nub-box">
        <p> 总收款</p>
        <p>{{accountArr.o2oGatheringTotal}}</p>
      </div>
      <div class="bd"></div>
      <div class="nub-box">
        <p>总提现</p>
        <p>{{accountArr.withdrawTotal}}</p>
      </div>
    </div>
    <button @click="sendBell">发送月历史账单</button>
  </div> -->
  <button @click="sendBell">发送月历史账单</button>
  <div class="list">
    <ul>
      <li @click="checkingDetail(records.month, records.totalNumber, records.totalMoney)" v-for="(records, index) in getMonthly" :key="index">
        <!--<p class="dian">•</p>-->
        <div class="word">
          <p>{{records.month | monthFi}}</p>
          <p>{{records.totalNumber}}笔</p>
          <p>{{records.totalMoney}}元</p>
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
  import {getAccountMsg, getMonthly, getMonthlyList} from '@/api/checking'
  import swal from 'sweetalert2'
  export default {
    name: 'checking',
    data () {
      return {
        sign: '',
        page: 0,
        accountArr: {},
        getMonthly: [],
        ismore: true,
        loading: false
      }
    },
    created () {
      getAccountMsg().then(res => {
        if (res.data.code === 200) {
          this.accountArr = res.data.data
//          console.log(res)
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
      getMonthly().then(res => {
        if (res.data.code === 200) {
          this.getMonthly = res.data.data.records
//          console.log(res.data.data.records)
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
      // 滚动加载
      let that = this
      window.addEventListener('scroll', function () {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight && that.ismore) {
          that.page ++
          that.loading = true
          that.getMonthlyListS()
//          console.log(that.page, '加载中。。。')
        }
      }, false)
    },
    filters: {
      monthFi: function (value) {
        let as = value.split('')
        as.splice(4, 0, '.')
        return as.join('')
      }
    },
    methods: {
      sendBell () {
        this.$router.push('/sendChecking')
      },
      checkingDetail (mid, totalNumber, totalMoney) {
        this.$router.push('/checkingDetail/' + mid + '/' + totalNumber + '/' + totalMoney)
      },
      getMonthlyListS () {
        getMonthlyList(this.page).then(res => {
          if (res.data.data.records) {
            this.getMonthly = this.getMonthly.concat(res.data.data.records)
          } else {
            this.loading = false
            this.ismore = false
          }
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
    margin: 0
    padding: 0
    border: none
    box-sizing: border-box;
    /*清除移动端设备默认的点击高亮效果*/
    -webkit-tap-highlight-color: transparent;
  }

  .checking{
    .top{
      background-color: #575fb6;
      .nub{
        .nub-box{
          width: 2.8378378378378377rem;
          height: 1.7567567567567568rem;
          display inline-block;
          text-align center;
          margin-left: 1.3513513513513513rem;
          margin-top 0.8108108108108109rem;
          p:nth-child(1){
            font-size 0.43243243243243246rem;
            color #bec1e2;
          }
          p:nth-child(2){
            font-size 0.4594594594594595rem;
            color #ffffff;
          }
        }
        .bd{
          display inline-block;
          border-left 1px solid white;
          height 0.9459459459459459rem;
          position relative;
          left 0.5405405405405406rem;
        }
      }
      button{
        margin-left: 0.866666rem;
        margin-bottom: 0.8108108108108109rem;
        margin-top: 0.2702702702702703rem;
        width: 8.378378378378379rem;
        height: 1rem;
        background-color: #ffffff;
        color #41447b;
        font-size 0.43243243243243246rem;
        bg-image('images/collect_letter');
        background-size:0.6rem;
        background-position 5.3rem 0.17rem;
        padding-right 1.0810810810810811rem;
        border-radius 0.2rem
      }
    }
    button{
      position fixed
      bottom 0
      margin-left: 1.866666rem;
      margin-bottom: 0.8108108108108109rem;
      margin-top: 0.2702702702702703rem;
      width: 6.378378378378379rem;
      height: 1rem;
      background-color: #575fb6;
      color #fff;
      font-size 0.40243243243243246rem;
      bg-image('images/send_check');
      background-size:0.58rem;
      background-position .8rem 0.17rem;
      padding-right .0810810810810811rem;
      border-radius 0.2rem
    }
    .list{
      ul{
        margin-top 0.5405405405405406rem;
        li{
          width: 93%;
          border-bottom 0.02rem solid #efefef;
          margin-left 7%;
          height: 0.8108108108108109rem;
          margin-bottom 0.32432432432432434rem;
          /**.dian {
            display inline-block;
            color #e4e4e4;
            font-size 0.4rem;
            position relative;
            top 0.5rem;
          }**/
          .word {
            color #515151;
            display inline-block;
            width: 8rem
            font-size 0.43243243243243246rem;
            p:nth-child(1){
              float left
              width: 2rem
              margin-left 0.13513513513513514rem;
              display inline-block;
              margin-right 1.4rem;
            }
            p:nth-child(2){
              display inline-block;
            }
            p:nth-child(3){
              float right
            }
          }
          span {
            float right
            width: 0.38rem
            height: 0.38rem
            bg-image('images/chevron')
            background-size: auto 100%
            position relative
            top 0.15rem
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
