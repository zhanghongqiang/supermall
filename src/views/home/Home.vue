<template>
    <div id="home">
      <nav-bar class="home-nav">
        <template v-slot:center>
          <div>购物街</div>
        </template>
      </nav-bar>
      <Scroll class="content"
              ref="scroll"
              :probeType="3"
              @scroll="computeScroll"
              @pullingUp="loadMore"
              :pullUpLoad="true">
        <home-swiper :banners="banners"></home-swiper>
        <recommand-view :recommands="recommends"></recommand-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </Scroll>
      <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommandView from './childComps/RecommandView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import { NEW, POP, SELL } from 'common/const'
export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        [NEW]: {
          page: 0,
          list: []
        },
        [POP]: {
          page: 0,
          list: []
        },
        [SELL]: {
          page: 0,
          list: []
        }
      },
      currentTab: POP,
      isShowBackTop: true
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommandView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created () {
    this.getHomeMultidata()
  },
  computed: {
    showGoods () {
      return this.goods[this.currentTab].list
    }
  },
  methods: {
    computeScroll (position) {
      this.isShowBackTop = Math.abs(position.y) < 200
    },
    loadMore () {
      console.log('loadMore')
      // this.getHomeGoods(this.currentTab)
    },
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentTab = POP
          break
        case 1:
          this.currentTab = NEW
          break
        case 2:
          this.currentTab = SELL
          break
      }
    },
    getHomeMultidata () {
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    backTopClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
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
  height: 100vh;
  position: relative;
}
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
</style>
