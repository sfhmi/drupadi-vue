<template>
  <div id="app">
    <Search />
  </div>
</template>

<script>
import Search from './pages/Search.vue';

export default {
  name: 'App',
  components: {
    Search
  }
}
</script>

<style lang="scss">
  @import "./src/assets/scss/Colors.scss";
  @import './src/assets/scss/CustomCheckbox.scss';
  @import './src/assets/scss/Cards.scss';
  #app {
    background-color: lighten($color: $primary, $amount: 40);
    min-height: 100vh;
  }
</style>