<template>
    <div class="tab-control">
        <div class="tab-control-item" v-for="(item, index) in titles" :key="index" @click="itemClick(index)" :class="{active:currentIndex === index}">
            <span>
                {{item}}
            </span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'TabControl',
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>
<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 14px;
        height: 44px;
        line-height: 44px;
        position: sticky;
        top: 44px;
        background-color: #fff;
    }

    .tab-control-item{
        flex: 1;
    }

    .tab-control-item span{
      padding: 5px;
    }
    .active{
      color: #ff8198;
    }

    .active span{
      border-bottom:2px solid #ff8198;
    }
</style>
