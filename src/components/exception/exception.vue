<template>
  <div :class="classnameFilter"></div>
</template>

<script>
export default {
  name: 'exception',
  data () {
    return {
      classname: 'exception_500'
    }
  },
  props: {
    code: {
      default: undefined
    }
  },
  computed: {
    classnameFilter () {
      switch (this.code) {
        case '403':
          return 'exception_403'
        case '404':
          return 'exception_404'
        case '500':
          return 'exception_500'
        default:
          return 'exception'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/mixin.stylus';
div{
  position relative
  top 4rem
  width: 3.133333rem
  height: 4.133333rem
  margin 0 auto
  background-size 100%
}
.exception_500 {
  bg-image('./img/server-500')
}
.exception_403 {
  bg-image('./img/exception_403')
}
.exception_404 {
  bg-image('./img/exception_404')
}
</style>