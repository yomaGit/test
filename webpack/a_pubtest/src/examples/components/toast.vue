<template>
  <div>
    toast test

    <Toast class="test"></Toast>

    <div class="testnum">12345</div>

    <button @click="toastshow('i am toast0')">toast show 'i am toast0'</button>
    <button @click="toastshow('i am toast1')">toast show 'i am toast1'</button>

  </div>
</template>

<script>

  export default {
    name: 'toast_name',
    data() {
      return {}
    },
    methods: {
      toastshow(str) {
        this.$toast(str)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
