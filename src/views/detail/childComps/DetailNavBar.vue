<template>
    <nav-bar class="detail-nav">
        <template v-slot:left>
            <img src="~assets/img/common/back.svg" alt="" class="back" @click="back">
        </template>
        <template v-slot:center>
            <div class="title">
                <span v-for="(item, index) in titles" :key="index" :class="{active: currentIndex === index}" @click="itemClick(index)" class="title-item">
                    {{item}}
                </span>
            </div>
        </template>
    </nav-bar>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default () {
        return ['商品', '参数', '评论', '推荐']
      }
    }
    // currentIndex: {
    //  type: Number,
    //  default: 0
    // }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
    .detail-nav{
        background-color: #fff;
    }
    .title-item.active{
        color: #ff5777;
    }
    .title{
        display:flex;
        padding: 0 20px;
        font-size: 14px;
    }
    .title-item{
        flex: 1;
    }
    .back{
        margin-top: 12px;
    }
</style>
