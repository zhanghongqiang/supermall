<template>
    <div id="home">
      <nav-bar class="home-nav">
        <template v-slot:center>
          <div>购物街</div>
        </template>
      </nav-bar>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref='topTabControl' v-show="showTopTabControl" class="fixed"></tab-control>
      <Scroll class="content"
              ref="scroll"
              :probeType="3"
              @scroll="computeScroll"
              @pullingUp="loadMore"
              :pullUpLoad="true">
        <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
        <recommand-view :recommands="recommends"></recommand-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref='tabControl'></tab-control>
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
import { debounce } from 'common/utils'
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
      isShowBackTop: false,
      tabControlOffsetTop: 0,
      showTopTabControl: false
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
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh)
    this.$bus.$on('onImageLoad', () => {
      refresh()
    })
  },
  activated () {
    console.log('activated')
  },
  deactivated () {
    console.log('deactivated')
  },
  computed: {
    showGoods () {
      return this.goods[this.currentTab].list
    }
  },
  methods: {
    swiperImageLoad () {
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    computeScroll (position) {
      this.isShowBackTop = Math.abs(position.y) > 200
      this.showTopTabControl = Math.abs(position.y) > this.tabControlOffsetTop
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
      this.$refs.tabControl.currentIndex = index
      this.$refs.topTabControl.currentIndex = index
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
  top: 0;
  right: 0;
  left: 0;
  background-color: #ff8198;
  color: #fff;
  z-index: 9;
}
#home{
  height: 100vh;
}
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
.fixed{
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
}
</style>
