<template>
<el-main>
	<h1>欢迎来到独具后台管理系统</h1>
	<h2>amdin:{{admin}}</h2>
</el-main>
</template>

<script>
import {setCookie,getCookie} from '../../assets/js/cookie.js'
export default {
    data() {
      return {
      	admin:"",//管理员名称
       }
    },
    created(){
    	this.admin=getCookie('username')
    },
    mounted(){
	    if(getCookie('username')){
	        this.$router.push(this.$router)
	    }
    }
}
</script>