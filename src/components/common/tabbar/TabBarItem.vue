<template>
    <div class="tab-bar-item" @click="btnClick">
        <slot name="tab-item-icon" v-if="!isActive"></slot>
        <slot name="tab-item-icon-active" v-else></slot>
        <div :style="activeStyle">
            <slot name="tab-item-text"></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    btnClick () {
      this.$router.replace(this.path)
      console.log(this.$store.getters.getDataSqrt)
      this.$store.commit({
        type: 'currentPath',
        path: this.path
      })
    }
  }
}
</script>
<style scoped>

.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
}

.tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: 3px;
}
.active{
    color: red;
}
</style>
