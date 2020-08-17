<template>
    <div class="recommand">
        <div v-for="item in recommands" :key="item.sort" class="recommand-item">
           <a :href="item.link">
               <img :src="item.image"/>
               <div>{{item.title}}</div>
           </a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RecommandView',
  props: {
    recommands: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
    .recommand{
        display: flex;
        text-align: center;
        font-size: 14px;
        padding: 15px 0 20px;
        border-bottom: 8px solid #eee;
    }

    .recommand-item{
        flex: 1;
    }

    .recommand-item img{
        width: 70px;
        height: 70px;
    }
</style>
