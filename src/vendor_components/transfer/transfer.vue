<template>
  <div class="transfer">
    <div class="banner">
      <div class="top">
        <button style="display: none">复制</button>
        <p>{{accountArr.name}}</p>
        <p>{{accountArr.accountId}}</p>
      </div>
      <div class="bottom">
        <div class="money">
          {{accountArr.balance}}元
          <span style="display: none">？</span>
          <div class="history" @click="transferlist"></div>
        </div>
      </div>
    </div>
    <div class="account-massage">
      <p>账户信息</p>
      <span>{{accountArr.bankAccountName}}</span>
      <span>{{accountArr.bank}}</span>
      <span>{{accountArr.bankBranch}}</span>
      <span>{{accountArr.bankAccountNo}}</span>
    </div>
    <div class="submit-big">
      <div class="input-money">
        <P>提现金额：</P>
        <div class="input-money-1">
          <input type="number" v-model="money">
          <span>元</span>
        </div>
      </div>
      <div class="show-left">
        <p>可提现余额{{accountArr.withdrawableBalance}}元</p>
        <p>(账户余额内不可提现的金额还未结账)</p>
      </div>
      <button @click="postTransfer">提交</button>
    </div>
  </div>
</template>
<script>
  import {getAccountMsg, postTransfer} from '@/vendor_api/transfer'
  import swal from 'sweetalert2'
  export default {
    name: 'vendor_transfer',
    data () {
      return {
        sign: '',
        accountArr: {},
        money: ''
      }
    },
    created () {
      document.body.style.background = '#fff'
      this.getAccountMsg()
    },
    methods: {
      getAccountMsg () {
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
      },
      postTransfer () {
        let text = ''
        if (this.money <= 0) {
          text = '提现金额必须大于0'
        }
        if (parseFloat(this.money) > this.accountArr.withdrawableBalance) {
          text = '金额不能大于可提现金额'
        }
        if (parseFloat(this.money) < 0.01) {
          text = '请输入正确的金额'
        }
        if (!this.money) {
          text = '请输入提现金额'
        }
        if (text) {
          swal({
            position: 'center',
            type: 'info',
            text: text,
            showConfirmButton: false,
            width: '70%',
            timer: 2000
          })
          return
        }
        let data = {
          money: this.money * 100,
          password: '',
          sign: 'robin',
          time: '2017',
          vid: ''
        }
        // swal({
        //   text: '确定提交?',
        //   width: '80%',
        //   type: 'info',
        //   showCancelButton: true,
        //   confirmButtonColor: '#3085d6',
        //   cancelButtonColor: '#d33',
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消'
        // }).then((result) => {
        //   if (result.value) {
        //     postTransfer(data).then(res => {
        //       if (res.data.code === 200) {
        //         swal({
        //           text: '我们将在一个工作日之内处理您的申请',
        //           type: 'success',
        //           width: '80%',
        //           confirmButtonText: '确定'
        //         })
        //         this.money = ''
        //         this.getAccountMsg()
        //       } else {
        //         swal({
        //           position: 'center',
        //           type: 'error',
        //           text: res.data.message,
        //           showConfirmButton: false,
        //           width: '70%',
        //           timer: 3000
        //         })
        //       }
        //     })
        //   }
        // })
        swal({
          title: '请输入密码',
          input: 'password',
          showCancelButton: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          showLoaderOnConfirm: true,
          preConfirm: (password) => {
            return new Promise((resolve) => {
              data.password = password
              postTransfer(data).then(res => {
                if (res.data.code === 200) {
                  swal({
                    text: '我们将在一个工作日之内处理您的申请',
                    type: 'success',
                    width: '80%',
                    confirmButtonText: '确定'
                  })
                  this.carrysuccess = true
                  this.getAccountMsg()
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
            })
          },
          allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
        })
      },
      transferlist () {
        this.$router.push('/vendor-transferlist')
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
  .transfer{
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
          letter-spacing 0.04rem
        }
      }
      .bottom{
        height 1.86666rem
        .money{
          margin-top: 0.6216216216216216rem
          font-size 0.8648648648648649rem
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
          .history{
            width: 0.65rem;
            height: 0.75rem;
            bg-image('images/collect_Transfer_accounts');
            background-size: 100% ;
            float right
            position: relative
            top 0.25rem
            right 1.2rem
          }
        }
      }
    }
    .account-massage{
      width: 90%;
      border: 1px solid #a3abfe
      background-color: #f2f3ff
      margin-top: 0.5rem
      margin-left:5%;
      border-radius 0.15rem
      padding-left 0.5rem
      P{
        font-size 0.39rem;
        color #5f5f61;
        margin-top: 0.4486486486486487rem;
        margin-bottom:0.3rem;
      }
      span{
        display block;
        margin-bottom:0.2rem;
        font-size 0.43243243243243246rem;
        color #434eb1;
      }
    }
    .submit-big{
      .input-money{
        margin-top 0.6567567567567568rem;
        margin-left 0.6756756756756757rem;
        p{
          font-size 0.43243243243243246rem;
          color #4a4a4a;
          display inline-block;
        }
        .input-money-1{
          width: 3.7rem;
          border-bottom:1.5px solid #e5e5e5;
          display inline-block;
          padding-bottom 0.051rem
          input{
            width: 3rem;
            height: 0.7405405405405406rem;
            display inline-block;
            font-size: 0.55rem
            color #787878
          }
          span{
            font-size 0.43243243243243246rem;
            color #b8b8b8;
          }
        }
      }
      .show-left{
        margin-top:0.4135135135135135rem;
        margin-left 0.6756756756756757rem;
        p{
          font-size 0.32432432432432434rem;
          color #646bbc;
          margin-bottom: 0.16216216216216217rem;
        }
      }
      button{
        margin-top: 1.5567567567567568rem;
        width: 5.594594594594595rem;
        height: 1.027027027027027rem;
        margin-left: 2.27027027027027rem;
        margin-bottom:0.8108108108108109rem;
        background-color: #575fb6;
        font-size 0.43243243243243246rem;
        color #ffffff;
        border-radius 0.16216216216216217rem
      }
    }
  }
</style>
