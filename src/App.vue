<template>
  <div id="app">
    <headerNav v-show="ishead"></headerNav>
    <router-view/>
    <footvue v-show="isfoot"></footvue>
  </div>
</template>

<script>
import headerNav from './components/header-vue'
import footvue from './components/foot-vue'
import {setCookie,getCookie} from './assets/js/cookie.js'

export default {
  name: 'app',
  data(){
  	return {
  		isfoot:true,
  		ishead:true
  	}
  },
  components:{
    headerNav,
    footvue
  },
  created(){
  },
  mounted(){
    if(window.location.href=="http://localhost:8082/#/login"){
      this.isfoot=false
      this.ishead=true
    }
    if(window.location.href.indexOf("admin-index")!=-1){//存在admin-index
      this.isfoot=false
      this.ishead=false
    }
  }
}
</script>

