<template>
    <div id="detail">
       <detail-nav-bar/>
       <detail-swiper :topImages="topImages"></detail-swiper>
    </div>
</template>
<script>
import { getDetail } from 'network/detail'
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created () {
    this.iid = this.$route.params.iid
    // getDetail(this.iid).then(res => {
    //  console.log(res)
    // })
  },
  methods: {
    getDetail () {
      getDetail(this.iid).then(res => {
        this.topImages = res.result.itemInfo.topImages
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
