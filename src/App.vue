<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
  @import "@/assets/scss/app.scss";
  #app {
    background-color: lighten($color: $primary, $amount: 40);
    min-height: 100vh;
    p {
      font-size: 14px;
      font-weight: 600;
    }
    label {
      font-weight: 600;
    }
   
  }
</style>