<template>
  <v-stage class="stage" :config="stageConfig">
    <v-layer>
      <v-circle v-for="(dotConfig, i) in dotConfigList" :key="i"
        :config="dotConfig" @dragmove="updatePos"></v-circle>
      <v-line v-for="(lineConfig, j) in lineConfigList" :key="j + 16"
        :config="lineConfig"></v-line>
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  name: 'MainCanvas',
  props: {
    filepath: String,
    handPos: Array,
    imageIdx: Number,
  },
  data() {
    return {
      stageConfig: {
        width: 600,
        height: 600,
      },
      lineConfigList: [],
      dotConfigList: [],
    };
  },
  watch: {
    // Run when image file changes.
    filepath() {
      this.setLineConfigList();
      this.setDotConfigList();
      this.$el.style.backgroundImage = `url(file://${this.filepath})`;
    },
  },
  methods: {
    updatePos(event) {
      this.setNewHandPos(event);
      this.setLineConfigList();
      this.setDotConfigList();
    },
    setNewHandPos(event) {
      const { x, y } = event.target.attrs;
      const dotIndex = event.target.index;
      this.$parent.posList[this.imageIdx][dotIndex] = [x, y];
    },
    setLineConfigList() {
      const lineConfigList = [];
      if (this.imageIdx > -1) {
        for (let i = 0; i < 5; i += 1) {
          const points = [
            this.handPos[(3 * i) + 1][0], this.handPos[(3 * i) + 1][1],
            this.handPos[(3 * i) + 2][0], this.handPos[(3 * i) + 2][1],
            this.handPos[(3 * i) + 3][0], this.handPos[(3 * i) + 3][1],
            this.handPos[0][0], this.handPos[0][1],
          ];
          const lineConfig = {
            x: 0,
            y: 0,
            points,
            stroke: 'black',
            strokeWidth: 1,
          };
          lineConfigList[i] = lineConfig;
        }
      }
      this.lineConfigList = lineConfigList;
    },
    setDotConfigList() {
      const dotConfigList = [];
      if (this.imageIdx > -1) {
        for (let i = 0; i < this.handPos.length; i += 1) {
          const dotConfig = {
            x: this.handPos[i][0],
            y: this.handPos[i][1],
            radius: 5,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 1,
            draggable: true,
          };
          dotConfigList[i] = dotConfig;
        }
      }
      this.dotConfigList = dotConfigList;
    },
  },
};
</script>

<style lang="scss" scoped>
.stage {
  background-size: 600px 600px;
  background-repeat: no-repeat;
}
</style>
