<template>
  <div class="sendChecking">
    <div class="list">
      <ul>
        <li v-for="(records,index) in getMonthly" :key="index">
          <label class="word" :for="index">
            <p>{{records.month | monthFi}}</p>
            <p>{{records.totalNumber}}笔</p>
            <p>{{records.totalMoney}}元</p>
          </label>
          <input type="checkbox" class="span" :id="index" :value="records.month"  v-model="months">
        </li>
      </ul>
    </div>
    <div class="bottom">
      <p class="icon-1">邮箱</p>
      <p class="email-1">{{accountArr.mail}}</p>
      <a @click="postCheckData" :class="{disabled:norecods}">发送</a>
    </div>
  </div>
</template>
<script>
  import {getAccountMsg, getMonthly, getMonthlyList, postCheckData} from '@/vendor_api/checking'
  import swal from 'sweetalert2'
  export default {
    name: 'vendor_sendChecking',
    data () {
      return {
        sign: '',
        page: 0,
        ismore: true,
        accountArr: {},
        getMonthly: [],
        months: [],
        checked: false,
        norecods: false
      }
    },
    created () {
      getAccountMsg().then(res => {
        if (res.data.code === 200) {
          this.accountArr = res.data.data
        } else {
          swal({
            position: 'center',
            type: 'error',
            text: '网络错误',
            showConfirmButton: false,
            width: '70%',
            timer: 3000
          })
        }
      })
      getMonthly().then(res => {
        if (res.data.code === 200) {
          if (res.data.data.records.length === 0) {
            this.norecods = true
            swal({
              position: 'center',
              type: 'info',
              text: '暂无上个月账单',
              showConfirmButton: true,
              width: '70%'
            })
          }
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
      postCheckData () {
        if (this.months.length === 0) {
          swal({
            text: '请选择要发送的月份',
            type: 'warning',
            width: '70%',
            showConfirmButton: false,
            timer: 2000
          })
          return
        }
        swal({
          text: '确定发送?',
          width: '80%',
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.value) {
            let months = this.months.join(',')
            postCheckData(months).then(res => {
              if (res.data.code === 200) {
                swal({
                  text: '发送成功!',
                  type: 'success',
                  width: '70%',
                  showConfirmButton: false,
                  timer: 2000
                })
  //            console.log(res)
              } else {
                swal({
                  text: '发送失败!',
                  type: 'error',
                  width: '70%',
                  showConfirmButton: false,
                  timer: 2000
                })
              }
            })
          }
        })
      },
      getMonthlyListS () {
        getMonthlyList(this.page).then(res => {
          if (res.data.data.records) {
            this.getMonthly = this.getMonthly.concat(res.data.data.records)
          } else {
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
  .sendChecking{
    .list{
      padding-bottom 3.5rem
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
            font-size 0.35rem;
            position relative;
            top 0.462rem;
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
              line-height 0.8108108108108109rem;
              margin-right 1.4rem;
            }
            p:nth-child(2){
              display inline-block;
            }
            p:nth-child(3){
              float right
            }
          }
          .span{
            border-radius 0.4rem
            width: 0.4rem
            height: 0.4rem
            border: 1px solid #98999a
            float right
            position relative
            top 0.1rem
            right 0.37rem
          }
        }
      }
    }
    .bottom{
      position fixed
      width 100%
      background #ffffff
      bottom 0
      .icon-1{
        height: 1rem
        width: 4rem
        font-size 0.4rem
        text-align center
        line-height 1rem
        color #878787
        bg-image('images/collect_letter')
        background-size: 16%
        background-position 0.7rem 0.2rem
        margin:0 33%
      }
      .email-1{
        font-size 0.4rem
        color #8a8a8a
        text-align center

      }
      a{
        text-decoration none
        width: 6rem
        height 1.2rem
        text-align center
        line-height 1.2rem
        display inline-block
        margin-left:2rem
        margin-top: 0.25rem
        margin-bottom: 0.6rem
        font-size 0.5rem
        background-color: #575fb6
        color #f6f6fb
        border-radius 0.15rem
      }
      .disabled{
        background #9b9ca2
      }
    }
  }
</style>
