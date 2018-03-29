<template>
  <div class='header'>
    <div class="left-back">
      <div class="go-back" v-show="gobackActive" @click="goBackClick"></div>
    </div>
    <div class="center-title">
      <span>{{title}}</span>
    </div>
    <div class="right-icon">
      <span class="share" v-show="shareActive" @click="share">分享</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-header',
  created () {
    // console.log(this.$route)
    window.goBack = this.goBackClick
  },
  data () {
    return {
      goback: false,
      gobackActive: false,
      routerState: '/',
      shareActive: false,
      shareType: null
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  },
  methods: {
    goBackClick () {
      console.log('this.routerState', this.routerState)
      switch (this.routerState) {
        case 'demand':
          this.$router.push({ path: '/' })
          break
        case 'demand-detail':
          this.$router.push({ path: '/demand' })
          break
        case 'vehicle':
          this.$router.push({ path: '/' })
          break
        case 'vehicle-detail':
          this.$router.push({ path: '/vehicle' })
          break
        default:
          this.$router.go(-1)
          break
      }
    },
    share () {
      alert(this.shareType)
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('name', to.name)
      this.gobackActive = true
      this.shareActive = false
      this.routerState = to.name
      // 只有在主页的时候 goback 不显示
      if (to.name === 'main') {
        this.gobackActive = false
      }
      if (to.name === 'demand-detail' || to.name === 'vehicle-detail') {
        this.shareActive = true
        this.shareType = to.name
        console.log('shareType', this.shareType)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/mixin.stylus'
  .header
    height 1.333333rem
    line-height 1.333333rem
    background-color #303570
    color #fff
    display flex
    .left-back, .center-title, .right-icon
      text-align center
      flex 1
    .go-back
      background url('./img/goback.svg') no-repeat .5rem 
      background-size .4rem
      width 2rem
      height 1.333333rem
    .center-title
      font-dpr(18px)
    .right-icon
      text-align right 
      .share 
        margin-right .4rem
</style>