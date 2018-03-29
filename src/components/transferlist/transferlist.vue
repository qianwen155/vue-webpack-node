<template>
  <div v-cloak >
    <ul class="">
        <li class="list" v-for="(record,index) in transferArr" :key="index" @click="toDetail(record.voucherId)">
            <div class="status">
                <span v-bind:style="{'color': statusColor[record.status]}">{{record.status | statusFilter}}</span>
              <div class="icon1"></div>
            </div>
            <div class="msg">
              <p style="font-size: 0.45rem">{{record.money}}元</p>
              <p style="font-size: 0.4rem" class="time">{{record.createdAt}}</p>
            </div>
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
    <div class="ismore" v-if="!ismore || transferArr.length == 0">
      <p>没有更多了...</p>
    </div>
  </div>
</template>

<script>
import {getTransferList} from '@/api/transfer'
import swal from 'sweetalert2'
export default {
  name: 'transferlist',
  data () {
    return {
      sign: '',
      transferArr: [],
      pagesize: 20,
      page: 0,
      ismore: true,
      loading: false,
      statusColor: {
        'WITHDRAWAL_PENDING': '#de8c02',
        'O2O_GATHERED_UNSETTLED': '#01a403',
        'WITHDRAWAL_SUCCESS': '#01a403',
        'O2O_GATHERED_SUCCESS': '#01a403',
        'O2O_GATHERED_FAIL': '#b90219',
        'WITHDRAWAL_REJECTED': '#b90219'
      }
    }
  },
  created () {
    this.getTransferList()
    let that = this
    window.addEventListener('scroll', function () {
      if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight && that.ismore) {
        that.page ++
        that.loading = true
        that.getTransferList()
        console.log(that.page, '加载中。。。')
      }
    }, false)
  },
  computed: {
  },
  methods: {
    getTransferList () {
      getTransferList(this.page).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.data.records) {
            this.transferArr = this.transferArr.concat(res.data.data.records)
          }
        } else {
          this.ismore = false
          this.loading = false
          swal({
            position: 'center',
            type: 'error',
            text: res.data.message,
            showConfirmButton: false,
            width: '70%',
            timer: 3000
          })
        }
//        console.log(res)
      })
    },
    toDetail (vid) {
      this.$router.push('/transferdetail/' + vid)
    }
  },
  filters: {
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
        default:
          break
      }
      return status
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/mixin.stylus"
.list
    padding .4rem
    line-height .7rem
    border 1px solid #dddddd
    .status
        float right
        line-height 1.4rem
        span
          display inline-block
          color green
        .icon1
          position relative
          top 0.09rem
          left 0.2rem
          display inline-block
          width: 0.4rem
          height: 0.4rem
          bg-image('images/chevron')
          background-size: auto 100%

.msg
        .time
            color rgba(29, 28, 27, 0.5)
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
[v-cloak] {
  display: none;
}
</style>
