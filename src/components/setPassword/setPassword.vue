<template>
  <div class="importGoods">
    <p class="banner">设置密码</p>
    <div class="page">
      
      <div><span>手机号码*</span><input type="text" v-model="dataAll.phone"></div>
      <div><span>验证码*</span><input type="text" class="code" v-model="dataAll.code"><button @click="getVerifyCode" :disabled="getCodeActive" :class="{disabled:getCodeActive}">{{getVerifyText}}</button></div>
      <div><span>密码*</span><input type="text" v-model="dataAll.password"></div>
      <div><span>确认密码*</span><input type="text" v-model="dataAll.re_password"></div>
      <button @click="postPassword" class="post_btn">提交</button>
    </div>
    <div class="page1" v-show="complete">
      <div class="icon-yes"></div>
      <p>提交成功</p>
      <p>您的进件已收到，<br>我们将在一个工作日内处理并且通知您</p>
    </div>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  import {postPassword, getVerityCode} from '@/api/setpassword'
  import {myToast} from '@/utils/tool'
  export default {
    name: 'setPassword',
    data () {
      return {
        getVerifyText: '获取验证码',
        getCodeActive: false,
        dataAll: {
          phone: '',
          code: '',
          password: '',
          re_password: ''
        },
        complete: false
      }
    },
    created () {
    },
    methods: {
      checkPhone (phone) {
        var reg = /^1[3|4|5|7|8][0-9]{9}$/
        return reg.test(phone.trim())
      },
      // 点击获取验证码
      getVerifyCode () {
        if (this.dataAll.phone === null || !this.checkPhone(this.dataAll.phone)) {
          myToast('error', '请输入正确的手机号码')
          return
        }
        // 发起验证码请求
        getVerityCode('accountRegister', this.dataAll.phone).then(res => {
          if (res.data.code === 200) {
            myToast('info', '发送成功,注意查收')
  //          Cookie.set('initTime', parseInt((new Date().getTime()) / 1000))
  //          Cookie.set('endTime', parseInt((new Date().getTime()) / 1000) + FreshPeriod)
            this.getVerifyCodeFresh(60)
          } else {
            myToast('error', res.data.message)
          }
        })
      },
      // 时间刷新
      getVerifyCodeFresh (period) {
        this.getCodeActive = true
        let freshInterval = setInterval(() => {
          this.getVerifyText = period-- + '秒后重试'
          // this.getVerifyText = this.getVerifyText
          if (period === 0) {
            this.getCodeActive = false
            this.getVerifyText = '重新发送'
            clearInterval(freshInterval)
          }
        }, 1000)
      },
      postPassword: function () {
        if (this.dataAll.phone === null || !this.checkPhone(this.dataAll.phone)) {
          myToast('error', '请输入正确的手机号码')
          return
        }
        if (this.dataAll.password.length > 6) {
          myToast('error', '密码长度只能为6位')
          return
        }
        if (this.dataAll.password !== this.dataAll.re_password) {
          myToast('error', '两次输入的密码不一致')
          return
        }
        if (this.dataAll.phone === '' || this.dataAll.code === '' || this.dataAll.password === '' || this.dataAll.re_password === '') {
          myToast('error', '信息未填完')
          return
        } else {
          // this.dataAll.accountNo = this.dataAll.accountNo.replace(/\s+/g, '')
          for (var key in this.dataAll) {
            this.dataAll[key] = this.dataAll[key].replace(/\s+/g, '')
          }
          swal({
            text: '确定提交?',
            width: '80%',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then((result) => {
            if (result.value) {
              postPassword(this.dataAll).then(res => {
                if (res.data.code === 200) {
                  swal({
                    text: '设置成功',
                    type: 'success',
                    width: '80%',
                    confirmButtonText: '确定'
                  })
                  this.$router.push('/home')
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
            }
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
      div{
        font-size 0.4rem
        color #4a4a4a
        margin-left:1rem
        margin-top:0.5rem
        margin-bottom:0.3rem
        display flex 
        span{
          color #6c73be
          margin-left:0.1rem
          display inline-block
          width 2rem
          line-height .95rem
        }
        input{
          padding-left 0.2rem
          height 0.95rem
        //   margin-left:1rem
          width: 6rem
          border: 1px solid #d3d3d3
          background-color: #ffffff
        }
        .code{
          width 2.9rem
          margin-right .3rem
        }
        button{
          width: 2.8rem
          height: 1.01rem
          // margin:0.5rem 0 0.5rem 2rem
          background-color: #575fb6
          color: #ffffff
          // font-size 0.45rem
          border-radius 0.1rem
        }
        .disabled{
          background-color: #dddddd
        }
      }
      .post_btn{
        width: 6rem
        height: 1.01rem
        margin:0.5rem 2rem
        background-color: #575fb6
        color: #ffffff
        font-size 0.45rem
        border-radius 0.1rem
      }
    }

  }

</style>
