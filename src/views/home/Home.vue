<template>
    <div id="home">
      <nav-bar class="home-nav">
        <template v-slot:center>
          <div>购物街</div>
        </template>
      </nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <recommand-view :recommands="recommends"></recommand-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"></tab-control>
      <ul>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
          <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
      </ul>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommandView from './childComps/RecommandView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import { getHomeMultidata } from 'network/home'
export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommandView,
    FeatureView,
    TabControl
  },
  created () {
    getHomeMultidata()
      .then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        console.log(res)
      })
  },
  methods: {
    itemClick () {
      this.$store.dispatch('updateText', 'button click').then(result => {
        console.log(result)
      })
    }
  }
}
</script>
<style scoped>
.home-nav{
  position: fixed;
  background-color: #ff8198;
  color: #fff;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
}
#home{
  padding: 44px 0 0 0;
}
</style>
