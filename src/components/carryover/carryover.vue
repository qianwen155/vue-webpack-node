<template>
  <div class="transfer" v-if="hiddenquery">
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
          <div class="history" @click="carryoverlist"></div>
        </div>
      </div>
    </div>
    <div class="account-massage" v-if="carrysuccess">
      <p>转账信息</p>
      <span>名称：{{carry_data.name}}</span>
      <span>账号：{{carry_data.accountId}}</span>
      <span>备注：{{carry_data.description}}</span>
      <span>金额：{{carry_data.money/100}}</span>
      <span>订单号：{{carry_data.orderId}}</span>
    </div>
    <div class="submit-big" v-else>
      <div class="acc_query">
        <span @click="toQuery">账户查询</span>
        <span>对方账户</span>
      </div>
      <div class="input_row_items">
        <span>姓名：</span>
         <input  v-model="carry_data.name"  placeholder="请输入姓名"> 
        <!-- <span>{{carry_data.name}}</span> -->
      </div>
      <div class="input_row_items">
        <span>账号：</span>
         <input  v-model="carry_data.accountId"  placeholder="请输入账号"> 
        <!-- <span>{{carry_data.accId}}</span> -->
      </div>
      <div class="input_row_items">
        <span>订单号：</span>
        <input  v-model="carry_data.orderId" placeholder="请输入订单号">
      </div>
      <div class="input_row_items">
        <span>备注：</span>
        <input  v-model="carry_data.description" placeholder="请输入备注">
      </div>
      <div class="input_row_money">
        <P>转账金额：</P>
        <div class="input_box_money">
          <input type="number" v-model="carry_data.money">
          <span>元</span>
        </div>
      </div>
      <div class="show-left">
        <p>可转账余额{{accountArr.withdrawableBalance}}元</p>
        <p>(账户余额内不可转账的金额还未结账)</p>
      </div>
      <button @click="postCarryover">提交</button>
    </div>
  </div>
  <div v-else class="search">
    <div class="searchtext search">
      <input type="text" placeholder="搜索账户名/账号" v-model="contain">
      <button type="button" @click="getAccountList"></button>
    </div>
    <div class="search_result">
      <div class="result_row" v-for="(account,index) in accountList" :key="index" @click="chooseAcc(account)">
        <input type="checkbox">
        <span>账户名：{{account.name}}</span>
        <span>账号：{{account.accountId}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {getAccountMsg, postCarryover, getAccountList} from '@/api/carryover'
  import swal from 'sweetalert2'
  export default {
    name: 'carryover',
    data () {
      return {
        sign: '',
        accountArr: {},
        money: '',
        hiddenquery: true,
        carrysuccess: false,
        accountList: [],
        contain: '',
        carry_data: {
          name: '',
          accountId: '',
          orderId: '',
          description: '',
          money: ''
        }
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
      toQuery () {
        this.hiddenquery = false
      },
      getAccountList () {
        getAccountList(this.contain).then(res => {
          if (res.data.code === 200) {
            this.accountList = res.data.data.records
            console.log(res)
            if (res.data.data.records.length === 0) {
              swal({
                position: 'center',
                type: 'info',
                text: '暂无相关记录，请重新输入关键词',
                showConfirmButton: false,
                width: '70%',
                timer: 1500
              })
            }
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
      chooseAcc (account) {
        this.carry_data.name = account.name
        this.carry_data.accountId = account.accountId
        this.hiddenquery = true
      },
      postCarryover () {
        let text = ''
        if (this.carry_data.money <= 0) {
          text = '转账金额必须大于0'
        }
        if (parseFloat(this.carry_data.money) > this.accountArr.withdrawableBalance) {
          text = '金额不能大于可转账金额'
        }
        if (parseFloat(this.carry_data.money) < 0.01) {
          text = '请输入正确的金额'
        }
        if (!this.carry_data.money || !this.carry_data.accountId) {
          text = '请填写完整转账信息'
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
        //     postCarryover(this.carry_data).then(res => {
        //       if (res.data.code === 200) {
        //         swal({
        //           text: '我们将在一个工作日之内处理您的申请',
        //           type: 'success',
        //           width: '80%',
        //           confirmButtonText: '确定'
        //         })
        //         this.carrysuccess = true
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
          width: '80%',
          showLoaderOnConfirm: true,
          preConfirm: (password) => {
            return new Promise((resolve) => {
              this.carry_data.password = password
              this.carry_data.money = this.carry_data.money * 100
              postCarryover(this.carry_data).then(res => {
                if (res.data.code === 200) {
                  swal({
                    text: '转账成功',
                    type: 'success',
                    width: '80%',
                    timer: 2000
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
                  this.carry_data.money = ''
                }
              })
            })
          },
          allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
        })
      },
      carryoverlist () {
        this.$router.push('/carryoverlist')
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
      input::-webkit-input-placeholder{
        color #C3C3C3;
        font-size 15px;
      }
      .acc_query{
        margin: .5rem auto
        width: 80%;
        margin-left: 0.675675675675676rem;
        color #575FB6;
        font-size 0.43243243243243246rem;
        span:nth-child(1){
          float right ;
          border 1pt solid #575FB6;
          padding .03 .07rem;
          border-radius 4px;
        }
      }
      .input_row_items{
        margin-top 0.6567567567567568rem;
        margin-left 0.6756756756756757rem;
        border-bottom:1pt solid #F2F2F2;
        padding-bottom: .5em;
        width: 85%;
        input{
          width 5rem;
        }
        span{
          font-size 0.43243243243243246rem;
          color #4a4a4a;
          display inline-block;
          width 2.5rem;
        }
        span:nth-child(2){
          color #dddddd
        }
      }
      .input_row_money{
        margin-top 0.6567567567567568rem;
        margin-left 0.6756756756756757rem;
        p{
          font-size 0.43243243243243246rem;
          color #4a4a4a;
          display inline-block;
          width 2.5rem;
        }
        .input_box_money{
          width: 3.7rem;
          border-bottom:1pt solid #F2F2F2;
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
.search{
  .searchtext {
    padding 30px
    display flex
    input {
      border-radius: 5px;
      background: #eceaea;
      top: 0;
      right: 0;
      width: 100%;
      height: 1.2rem;
      text-indent 20px;
      font-size .45rem;
      bg-image('images/Group');
      background-size: .6rem ;
      background-position .2rem;
      text-indent 1rem;
    }
    button {
      background: transparent;
      border-radius: 5px;
      width: 2rem;
      top: 32px;
      right: 27px;
      font-size: 0.45rem;
      margin-left .1rem;
    }
    button:before {
      content: "搜索";
      color: #575fb6;
    }
  }
  .search_result{
    .result_row{
      width: 80%;
      border: 1px solid #a3abfe
      background-color: #f2f3ff
      margin-top: 0.5rem
      margin-left:30px;
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
      input{
        float right;
        margin .5rem;
      }
    }
  }
}
 
</style>
