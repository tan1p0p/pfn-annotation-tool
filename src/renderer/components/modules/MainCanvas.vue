<template>
  <canvas width="600" height="600"></canvas>
</template>

<script>
export default {
  name: 'MainCanvas',
  props: {
    filepath: String,
    handPos: Array,
  },
  mounted() {
    this.ctx = this.$el.getContext('2d');
  },
  watch: {
    filepath() {
      this.$el.style.backgroundImage = `url(file://${this.filepath})`;
      this.renderPos();
    },
  },
  methods: {
    renderPos() {
      for (let i = 0; i < this.handPos.length; i += 1) {
        this.drawPoints(this.handPos[i][0], this.handPos[i][1]);
      }
      for (let i = 0; i < 5; i += 1) {
        this.drawPath(this.handPos[0], this.handPos[(3 * i) + 3]);
        this.drawPath(this.handPos[(3 * i) + 3], this.handPos[(3 * i) + 2]);
        this.drawPath(this.handPos[(3 * i) + 2], this.handPos[(3 * i) + 1]);
      }
    },
    drawPoints(x, y) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.stroke();
    },
    drawPath(pos1, pos2) {
      this.ctx.beginPath();
      this.ctx.moveTo(pos1[0], pos1[1]);
      this.ctx.lineTo(pos2[0], pos2[1]);
      this.ctx.closePath();
      this.ctx.stroke();
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  background-size: 600px 600px;
}
</style>
