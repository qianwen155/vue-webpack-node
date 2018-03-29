<template>
  <div id="app">
    <div class="header-wrapper">
      <v-header class="v-header" v-show="false"></v-header>
    </div>
    <exception v-if="exception" :code="code"></exception>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import vHeader from '@@/header/header'
import exception from '@@/exception/exception'
import { eventHub } from '@/utils/eventHub'
export default {
  name: 'app',
  data () {
    return {
      exception: false,
      code: ''
      // routerState: '/'
    }
  },
  components: {
    vHeader,
    exception
  },
  created () {
    window.goback = this.goback
    window.getroute = this.getroute
    localStorage.setItem('wt_pagename', this.$route.name)
    // window.name = this.$route.name
    eventHub.$on('serverError', data => {
      console.log(data)
      this.code = data.toString()
      this.exception = true
    })
  },
  methods: {
    goback () {
      // if (this.$route.name === 'myAccount') {
      //   return 'myAccount'
      // } else {
      //   this.$router.go(-1)
      // }
      window.history.go(-1)
    },
    getroute () {
      localStorage.setItem('wt_pagename', this.$route.name)
      return this.$route.name
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('name', to.name, from.name)
      // this.routerState = to.name
      localStorage.setItem('wt_pagename', to.name)
      // window.name = to.name
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
body{
  min-height 100%;
}
// 禁止选中
* {
    -webkit-touch-callout:none;
    -moz-touch-callout:none;
    -ms-touch-callout:none;
    touch-callout:none;
    margin: 0
    padding: 0
    border: none
    box-sizing: border-box;
    /*清除移动端设备默认的点击高亮效果*/
    -webkit-tap-highlight-color: transparent;
 }
@import "./assets/mixin.stylus"
html,#app,body {
  /*height 100%*/
}
font-size = 14px
div {
  font-size: font-size;
}
[data-dpr="2"] div {
  font-size: (font-size*2);
}
[data-dpr="3"] div {
  font-size: (font-size*3);
}
.toast-rem
  width: 5rem
  height: 3rem
  border-radius .3rem
.mint-toast-text {
  font-size: font-size;
}
[data-dpr="2"] .mint-toast-text {
  font-size: (font-size*2);
}
[data-dpr="3"] .mint-toast-text {
  font-size: (font-size*3);
}
.mint-toast-text
  margin-top  1rem
.mint-cell
  min-height 1.5rem
#app
  .v-header
    position fixed
    width 100%
    left 0
    top 0
    z-index 99
  .mint-swipe-indicators {
    bottom: 0
  }
  .mint-swipe-indicator {
    width: 0.25rem
    height: 0.25rem
    display: inline-block
    border-radius: 100%
    background: #C7CCF8
    opacity: none
    margin: 0 .066667rem
    opacity: 1
  }
  .mint-swipe-indicator.is-active {
    background: #575FB7
  }
</style>
