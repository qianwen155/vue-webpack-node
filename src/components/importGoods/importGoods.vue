<template>
  <div class="importGoods">
    <p class="banner">{{title}}</p>
    <div class="page" v-show="page1">
      <!-- <p>进件网点<span>*</span></p>
      <div class="v-select-div">
        <v-select label="name"  :options="siteArr" v-model="dataAll.state" ></v-select>
      </div> -->
      <!-- <select name="" id="" v-model="dataAll.state">
        <option  v-for="(site,index) in siteArr" :key="index" :value="site.id">{{site.name}}</option>
      </select> -->
      <!-- <p>网点编号<span>*</span></p><input type="text" v-model="dataAll.state"> -->
      <p>客户名称<span>*</span></p><input type="text" v-model="mchName1">
      <p>营业执照号码<span>*</span></p><input type="text" v-model="dataAll.bizLicense">
      <!-- <p>营业执照有效日期<span>*</span></p><input type="number" placeholder="日期填写格式：YYYYMMDD，如20180201" v-model="licenseValidTo1" @input="lmtInput1()"> -->
      <p>公司地址<span>*</span></p><input type="text" v-model="dataAll.address">
      <div class="number1">
        <span class="dot-1">1</span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot-1" style="background-color: #bababa;">2</span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot-1" style="background-color: #bababa;">3</span>
      </div>
      <button @click="next1">下一步</button>
    </div>
    <div class="page" v-show="page2">
      <p>法人姓名<span>*</span></p><input type="text" v-model="dataAll.principal">
      <p>法人身份证号<span>*</span></p><input type="text" v-model="dataAll.certNo">
      <p>联系人<span>*</span></p><input type="text" v-model="dataAll.contactName">
      <p>联系手机<span>*</span></p><input type="number" v-model="dataAll.phone" @input="lmtInput2()">
      <p>邮箱<span>*</span></p><input type="email" placeholder="用于接收对账单等" v-model="dataAll.mail">
      <div class="number1">
        <span class="dot-1" @click="goTo1">1</span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot-1">2</span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot" style="background-color: #d3d4d4;"></span>
        <span class="dot-1" style="background-color: #bababa;">3</span>
      </div>
      <button @click="next2">下一步</button>
    </div>
    <div class="page" v-show="page3">
      <p>开户名称<span>*</span></p><input type="text" v-model="dataAll.accountName">
      <p>开户银行<span>*</span></p><input type="text" v-model="dataAll.accountBank">
      <p>开户支行<span>*</span></p><input type="text" v-model="dataAll.accountBankBranch">
      <p>开户账号<span>*</span></p><input type="text" v-model="dataAll.accountNo" >
       <p>确认开户账号<span>*</span></p><input type="text" v-model="accountNo" >
      <div class="number1">
        <span class="dot-1" @click="goTo1">1</span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot-1" @click="goTo2">2</span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot-1" @click="goTo3">3</span>
      </div>
      <button @click="done3">提交</button>
    </div>
    <div class="page1" v-show="page4">
      <div class="icon-yes"></div>
      <p>提交成功</p>
      <p>您的进件已收到，<br>我们将在一个工作日内处理并且通知您</p>
    </div>
  </div>
</template>
<script>
  import {Toast, MessageBox} from 'mint-ui'
  import {importGoods, getTitle} from '@/api/importGoods'
  export default {
    name: 'importGoods',
    data () {
      return {
        licenseValidTo1: '2099-12-30 23:59:59',
        mchName1: '',
        title: '',
        dataAll: {
          mchName: '',
          bizLicense: '',
          licenseValidTo: '2099-12-30 23:59:59',
          address: '',
          principal: '',
          certNo: '',
          contactName: '',
          phone: '',
          mail: '',
          accountName: '',
          accountBank: '',
          accountBankBranch: '',
          accountNo: '',

          displayName: '',
          certType: '1'
        },
        page1: true,
        page2: false,
        page3: false,
        page4: false,

        sign: '',
        requesturl: '',
        // siteArr: [{name: 'CA1', id: 'Canada1'}, {name: 'CA2', id: 'Canada2'}, {name: 'CA3', id: 'Canada3'}],
        preName: '',
        accountNo: '',
        selected: null
      }
    },
    beforeCreate () {
      localStorage.setItem('accesstoken', this.$route.query.accesstoken)
    },
    created () {
      document.body.style.background = '#f2f3ff'
      // this.dataAll.state = this.$route.query.state
      getTitle().then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.requesturl = res.data.data.host + '?method=business-info'
          // this.getSiteInfo(this.requesturl)
          this.title = res.data.data.title !== '' ? res.data.data.title : '商户进件'
          this.preName = res.data.data.preName
        } else {
          Toast({
            message: res.data.message,
            className: 'toast-rem',
            iconClass: 'icon icon-warring'
          })
        }
      })
      console.log(this.requesturl)
    },
    methods: {
      // 获取未进件网点
      // getSiteInfo: function (requesturl) {
      //   let that = this
      //   axios.get(requesturl)
      //     .then(function (response) {
      //       that.siteArr = response.data.result
      //       console.log(response)
      //     })
      //     .catch(function (error) {
      //       Toast({
      //         message: error.data.message,
      //         className: 'toast-rem',
      //         iconClass: 'icon icon-warring'
      //       })
      //       console.log(error)
      //     })
      // },
      // 卡号格式化
      // getAccountNo () {
      //   let accountnum = this.dataAll.accountNo
      //   if (accountnum.length < 16) {
      //     Toast({
      //       message: '银行卡号不正确',
      //       className: 'toast-rem',
      //       iconClass: 'icon icon-warring'
      //     })
      //   }
      //   accountnum = accountnum.replace(/\s+/g, '')
      //   this.dataAll.accountNo = accountnum.slice(0, 4) + ' ' + accountnum.slice(4, 8) + ' ' +
      //   accountnum.slice(8, 12) + ' ' + accountnum.slice(12, 16) + ' ' + accountnum.slice(16, -1)
      // },
      // 输入框限制长度
      // lmtInput1 () {
      //   this.licenseValidTo1 = this.licenseValidTo1.substring(0, 8)
      // },
      lmtInput2 () {
        this.dataAll.phone = this.dataAll.phone.substring(0, 11)
      },
      // 处理日期格式
      dataT: function () {
        // let a = this.licenseValidTo1.toString()
        // this.dataAll.licenseValidTo = a.slice(0, 4) + '-' + a.slice(4, 6) + '-' + a.slice(6, 8) + ' 00:00:00'
        this.dataAll.mchName = this.preName + '.' + this.mchName1
        this.dataAll.displayName = this.preName + '.' + this.mchName1
      },
      goTo1: function () {
        this.page1 = true
        this.page2 = false
        this.page3 = false
      },
      goTo2: function () {
        this.page1 = false
        this.page2 = true
        this.page3 = false
      },
      goTo3: function () {
        this.page1 = false
        this.page2 = false
        this.page3 = true
      },
      goTo4: function () {
        this.page1 = false
        this.page2 = false
        this.page3 = false
        this.page4 = true
      },

      next1: function () {
        // 判断日期
        // let regDate = /^((?:19|20)\d\d)(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/
        if (this.mchName1 === '' || this.dataAll.bizLicense === '' || this.dataAll.address === '') {
          Toast({
            message: '信息未填完',
            className: 'toast-rem',
            iconClass: 'icon icon-warring'
          })
        // } else if (this.licenseValidTo1.length !== 8 || !regDate.test(this.licenseValidTo1)) {
        //   Toast({
        //     message: '日期格式不对',
        //     className: 'toast-rem',
        //     iconClass: 'icon icon-warring'
        //   })
        } else {
          this.dataT()
//          console.log(this.dataAll)
          this.goTo2()
        }
      },
      next2: function () {
        // 判断手机号
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/
        // 判断邮箱
        var regMail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        var regCerNo = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
        if (this.dataAll.principal === '' || this.dataAll.certNo === '' || this.dataAll.contactName === '' || this.dataAll.phone === '' || this.dataAll.mail === '') {
          Toast({
            message: '信息未填完',
            className: 'toast-rem',
            iconClass: 'icon icon-warring'
          })
        } else if (!regCerNo.test(this.dataAll.certNo)) {
          Toast({
            message: '身份证格式错误',
            className: 'toast-rem',
            iconClass: 'icon icon-warring'
          })
        } else if (!regPhone.test(this.dataAll.phone)) {
          Toast({
            message: '手机号码格式不对',
            className: 'toast-rem',
            iconClass: 'icon icon-warring'
          })
        } else if (!regMail.test(this.dataAll.mail)) {
          Toast({
            message: '邮箱格式不对',
            className: 'toast-rem',
            iconClass: 'icon icon-warring'
          })
        } else {
          this.goTo3()
        }
      },
      done3: function () {
        // if (this.dataAll.accountNo.length < 16) {
        //   Toast({
        //     message: '银行卡号位数不对',
        //     className: 'toast-rem',
        //     iconClass: 'icon icon-warring'
        //   })
        //   return
        // }
        if (this.dataAll.accountNo !== this.accountNo) {
          Toast({
            message: '两次输入的银行卡号不一致',
            className: 'toast-rem',
            iconClass: 'icon icon-warring'
          })
          return
        }
        if (this.dataAll.accountName === '' || this.dataAll.accountBank === '' || this.dataAll.accountBankBranch === '') {
          Toast({
            message: '信息未填完',
            className: 'toast-rem',
            iconClass: 'icon icon-warring'
          })
          return
        } else {
          // this.dataAll.accountNo = this.dataAll.accountNo.replace(/\s+/g, '')
          for (var key in this.dataAll) {
            this.dataAll[key] = this.dataAll[key].replace(/\s+/g, '')
          }
          MessageBox.confirm('确定提交?').then(() => {
            importGoods(this.dataAll).then(res => {
              if (res.data.code === 200) {
//                console.log(this.dataAll)
                this.goTo4()
              } else {
                Toast({
                  message: res.data.message,
                  className: 'toast-rem',
                  iconClass: 'icon icon-warring'
                })
              }
            })
          })
        }
      }
    },
    beforeDestroy () {
    }
  }
</script>
<style lang="stylus">
  @import "../../assets/mixin.stylus"
  .mint-toast-text{
    margin-top: 0.3rem;
  }
  .mint-toast-icon {
    margin-top: 0.1rem;
  }
  .icon-warring{
    width: 0.9rem;
    height: 0.9rem;
    margin: 0.2rem auto;
    bg-image('images/tan')
    background-size: 100% 100%;
  }
</style>
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
  .importGoods{
    .banner{
      height: 4.5rem
      text-align center
      line-height 4.5rem
      bg-image('images/circular')
      background-size: 100%
      background-color: #575fb6
      font-size 1rem
      color #ffffff
    }
    .page{
      p{
        font-size 0.4rem
        color #4a4a4a
        margin-left:1rem
        margin-top:0.5rem
        margin-bottom:0.3rem
        span{
          color #6c73be
          margin-left:0.1rem
        }
      }
      input{
        padding-left 0.2rem
        height 0.95rem
        margin-left:1rem
        width: 8rem
        border: 1px solid #d3d3d3
        background-color: #ffffff
      }
      input[placeholder]{
        font-size 0.4rem
      }
      .number1{
        margin:1rem 0 0 2.15rem
        .dot-1{
          display inline-block
          width: 0.56rem
          height: 0.56rem
          line-height 0.56rem
          background-color: #575fb6
          color #f9f9f9
          border-radius 0.56rem
          margin-left:0.1rem
          font-size 0.4rem
          padding-left 0.16rem
        }
        .dot{
          width: 0.24rem
          height: 0.24rem
          border-radius 0.24rem
          background-color: #b5b9db
          display inline-block
          margin-left:0.1rem
        }
      }
      button{
        width: 5.52rem
        height: 1.01rem
        margin:0.5rem 0 0.5rem 2rem
        background-color: #575fb6
        color: #ffffff
        font-size 0.45rem
        border-radius 0.1rem
      }
    }
    .page1{
      .icon-yes{
        bg-image('images/settlement')
        background-size: 100%
        width: 1.6rem
        height: 1.6rem
        margin:1.5rem auto 0.7rem
      }
      p:nth-child(2){
        color #36b536
        font-size: 0.6rem
        text-align center
      }
      P:nth-child(3){
        color #868686
        font-size 0.4rem
        text-align center
        margin-top:0.5rem
      }
    }
  }

</style>
