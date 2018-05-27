<template>
  <div id="admin">   
    <router-view/>
  </div>
</template>

<script>
//import loginad from './views/login_ad'
import {setCookie,getCookie} from '../assets/js/cookie.js'
export default {
  name: 'Admin',
  data(){
  	return {
      isload:true
  	}
  },
  created(){
  	if(getCookie('username')){
      this.$router.push('/admin-index')
    }else{
    	this.$router.push('/admin-index/login')
    }
  },


}
</script>

