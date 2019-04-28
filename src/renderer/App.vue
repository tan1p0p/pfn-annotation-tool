<template>
  <div id="app">
    <main-page></main-page>
  </div>
</template>

<script>
import MainPage from '@/components/MainPage';

export default {
  name: 'hand-pose-annotator',
  components: {
    MainPage,
  },
};
</script>

<style lang="scss">
@charset "utf-8";
@import "../../node_modules/bulma/bulma.sass";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
