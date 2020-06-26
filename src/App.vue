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
  @import '@/assets/scss/components/_buttons.scss';
  @import '@/assets/scss/components/_custom-checkbox.scss';
  @import '@/assets/scss/components/_cards.scss';
  @import '@/assets/scss/components/_datepicker.scss';
  @import '@/assets/scss/components/_forms.scss';
  @import '@/assets/scss/components/_modals.scss';


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