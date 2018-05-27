<template>
  <div class="top_menu">
  <div class="leftpart">
    <img src="../assets/img/logo.png">
    <div class="lefttext">
      <ul>
        <router-link to="/index"><li class="active">首页</li></router-link>
        <router-link :to="{ name:'Goodtype',params:{typeid:1}}"><li>沙发</li></router-link>
        <router-link :to="{ name:'Goodtype',params:{typeid:2}}"><li>茶桌</li></router-link>
        <router-link :to="{ name:'Goodtype',params:{typeid:3}}"><li>凳椅</li></router-link>
        <router-link :to="{ name:'Goodtype',params:{typeid:4}}"><li>柜架</li></router-link>
        <router-link :to="{ name:'Goodtype',params:{typeid:5}}"><li>灯饰</li></router-link>
        <router-link :to="{ name:'Goodtype',params:{typeid:6}}"><li>床具</li></router-link>
    </ul>
    </div>
  </div>
  <div class="rightpart">
  	<el-tooltip placement="bottom" :disabled="disabled">
	  <div slot="content" >
	  	<ul>
	  		<li><span style="color:#fff;line-height:1.5rem;margin:1rem 30%;cursor:pointer;" @click="my">{{name}}</span></li>
            <li><span style="color:#fff;line-height:1.5rem;margin:1rem 3%;cursor:pointer;" @click="order">我的订单</span></li>
	  		<li><el-button type="info" size="mini" @click="quit" v-show="signin" round style="margin:0.5rem 2%;">注销</el-button></li>
	  	</ul>
	  </div>
	  <router-link to="/login"><i class="iconfont">&#xe6b8;</i></router-link>
	</el-tooltip>
    <router-link to="/shoppingcar"><i class="iconfont">&#xe60c;</i></router-link>
  </div>
</div>
</template>

<script>
/*引入公共方法*/
import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'
    export default{
        data(){
            return{
                name: '',
                signin:false,
                disabled:false
            }
        },
        watch:{
        	"this.signin"(){
        		window.location.reload()
        	}
        },
        created(){
        	if(getCookie('username')){
        		this.signin=true
        		this.disabled=false
	       	 	this.name=getCookie('username')
	    	}
	    	else{
	    		this.signin=false
	    		this.disabled=true
	    	}	
    	},
        methods:{
            quit(){
                delCookie('username')
                alert("退出登录")
                this.name=''
                this.signin=false
                window.location.reload()
            },
            order(){
                this.$router.push("/Orderlist")
            },
            my(){
            	this.$router.push("/person")
            }
        }
    }
</script>
<style> 
.leftpart a.router-link-exact-active,.leftpart a.router-link-active li{background-color: #aaa;}
</style>
