<template>
	<div class="wrapper">	
	<h3>独居-DUJU</h3>	
	<div id="login"> 
        <form id="log" method="" v-show="showLogin" autocomplete="off" >  <span>欢迎回来</span> 
        	 <p v-show="showTishi">{{tishi}}</p>
            <input type="text" required="required" placeholder="用户名" v-model="username">  
            <input type="password" required="required" placeholder="密码" v-model="password">
            <input id="deng" type="button" @click="login" value="登录" style="width:60%;margin:5% 20%" >  
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
//import axios from 'axios'
export default{
    data(){
        return{
            showLogin: true,
            showRegister: false,
            showTishi:false,
            tishi:'',
            username: '',
            password: '',
        }
    },
  mounted(){
  /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if(getCookie('username')){
        this.$router.push('/admin-index')
    }else{
    	this.$router.push('/admin-index/login')
    }
  },
  methods:{
    login(){
      var self = this; //很关键
        if(self.username == "" || self.password == ""){
            alert("请输入用户名或密码")
        }else{
            /*接口请求*/
            self.$axios({
             method: 'post',
             url: '../api/login-ad',
             data: {
              admin_name:self.username,
              admin_pwd:self.password
             },
             timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  self.tishi = "该用户不存在或密码错误"
                  self.showTishi = true
               }else{
                  self.tishi = "登录成功"
                  self.showTishi = true
                  setCookie('username',self.username,1000*60)
                  setTimeout(function(){
                      self.$router.push('/admin-index')
                  }.bind(self),1000)
               }
            }).catch(function(error) {
                  console.log(error);
                  self.tishi = '服務器繁忙，請刷新頁面或者稍後重試!'
                  self.showTishi = true
              });
        }
    }
  },
}
</script>