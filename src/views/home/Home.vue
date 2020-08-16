<template>
    <div id="home">
      <nav-bar class="home-nav">
        <template v-slot:center>
          <div>购物街</div>
        </template>
      </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
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
    NavBar
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
  background-color: #ff8198;
  color: #fff;
}
</style>
