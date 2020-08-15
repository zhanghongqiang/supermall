<template>
    <div>
        <h2>首页</h2>
        <button @click="itemClick">button</button>
    </div>
</template>

<script>
export default {
  name: 'Home',
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

</style>
