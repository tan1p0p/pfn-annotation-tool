<template>
  <canvas></canvas>
</template>

<script>
export default {
  name: 'MainCanvas',
  props: {
    fileList: Array,
    posList: Array,
    imageIdx: Number,
  },
  mounted() {
    this.ctx = this.$el.getContext('2d');
  },
  watch: {
    imageIdx() {
      this.$el.style.backgroundImage = `url(${this.fileList[this.imageIdx]})`;
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  width: 600px;
  height: 600px;
}
</style>
