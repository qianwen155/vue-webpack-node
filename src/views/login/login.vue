<template>
	<div class="wrapper">	
	<h3>独居-DUJU</h3>	
	<div id="login"> 
        <form id="log" method="" v-show="showLogin" autocomplete="off" >  <span>欢迎回来</span> 
        	 <p v-show="showTishi">{{tishi}}</p>
            <input type="text" required="required" placeholder="用户名" v-model="username">  
            <input type="password" required="required" placeholder="密码" v-model="password">
            <input id="deng" type="button" @click="login" value="登录" >  
            <input id="zhuce" type="button" @click="ToRegister" value="注册" > 
        </form> 
        <form id="reg" method="" v-show="showRegister" autocomplete="off" style="display: none">   <span>欢迎加入</span> 
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" required="required" placeholder="用户名" v-model="newUsername">  
            <input type="password" required="required" placeholder="密码" v-model="newPassword">
            <input type="password" required="required" placeholder="确认密码" v-model="ag_password">
            <input id="deng" type="button" @click="ToLogin" value="登录" >  
            <input id="zhuce" type="button" @click="register" value="注册" >  
        </form>  
    </div> 
		
	<ul class="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>
</template>

<style>
	@import url(../../assets/css/login.css);
</style>

<script>
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import axios from 'axios'
export default{
    data(){
        return{
            showLogin: true,
            showRegister: false,
            showTishi:false,
            tishi:'',
            username: '',
            password: '',
            newUsername: '',
            newPassword: '',
            ag_password: ''
        }
    },
  mounted(){
  /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if(getCookie('username')){
        this.$router.push('/index')
    }
  },
  methods:{
  	ToRegister(){
	    this.showRegister = true
	    this.showLogin = false
	  },
  	ToLogin(){
  	    this.showRegister = false
  	    this.showLogin = true
  	},
    login(){
      var self = this; //很关键
        if(self.username == "" || self.password == ""){
            alert("请输入用户名或密码")
        }
        else{
            /*接口请求*/
            axios({
             method: 'post',
             url: 'api/login',
             data: {
              user_name:self.username,
              user_pwd:self.password
             },
             timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  self.tishi = "该用户不存在或密码错误"
                  self.showTishi = true
              }else if(res.data == 'admin'){
                  self.tishi = "账号出错"
                  self.showTishi = true
              }else{
                  self.tishi = "登录成功"
                  self.showTishi = true
                  setCookie('username',self.username,1000*60)
                  setTimeout(function(){
                      self.$router.push('/index')
                  }.bind(self),500)
              }
            }).catch(function(error) {
                console.log(error);
                self.tishi = '服務器繁忙，請刷新頁面或者稍後重試!'
                self.showTishi = true
            });
        }
    },
    register(){
      var self = this; //很关键
	    if(self.newUsername == "" || self.newPassword == ""){
	        alert("请输入用户名或密码");
	    }
      else if(self.newPassword != self.ag_password){
          alert("两次密码不一致");
          self.newPassword = ''
          self.ag_password = ''
      }
      else{
          axios({
             method: 'post',
             url: 'api/register',
             data: {
              user_name:self.newUsername,
              user_pwd:self.newPassword
             },
             timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  self.tishi = "该用户名已存在"
                  self.showTishi = true
              }else if(res.data == 'admin'){
              /*路由跳转self.$router.push*/
                  self.tishi = "这是管理员账号"
                  self.showTishi = true
              }else{
                  self.tishi = "注册成功"
                  self.showTishi = true
                  setTimeout(function(){
                      self.showRegister = false
                      self.showLogin = true
                      self.showTishi = false
                      self.username=self.newUsername
                  }.bind(self),1000)
              }
             }).catch(function(error) {
                  console.log(error);
                  self.tishi = '服務器繁忙，請刷新頁面或者稍後重試!'
                  self.showTishi = true
              });
	    }
	  },
  },
}
</script>