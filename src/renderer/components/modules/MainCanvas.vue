<template>
  <v-stage class="container stage" :config="stageConfig">
    <v-layer>
      <v-line v-for="(lineConfig, i) in lineConfigList" :key="i"
        :config="lineConfig"></v-line>
    </v-layer>
    <v-layer>
      <v-circle v-for="(dotConfig, i) in dotConfigList" :key="i"
        :config="dotConfig" @dragmove="updatePos"></v-circle>
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  name: 'MainCanvas',
  props: {
    filepath: String,
    handPos: {
      type: Array,
      deep: true,
    },
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
      colorList: [
        'black',
        'hsl(0, 100%, 50%)',
        'hsl(72, 100%, 50%)',
        'hsl(144, 100%, 50%)',
        'hsl(216, 100%, 50%)',
        'hsl(288, 100%, 50%)',
      ],
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
    render() {
      this.setDotConfigList();
      this.setLineConfigList();
    },
    updatePos(event) {
      this.setNewHandPos(event);
      this.render();
    },
    setNewHandPos(event) {
      const { x, y } = event.target.attrs;
      const dotIndex = event.target.index;
      this.$parent.posList[this.imageIdx][dotIndex] = [x, y];
    },
    setDotConfigList() {
      const dotConfigList = [];
      if (this.imageIdx > -1) {
        for (let i = 0; i < this.handPos.length; i += 1) {
          let fill = this.colorList[0];
          if (i > 0) {
            fill = this.colorList[Math.ceil(i / 3)];
          }
          const dotConfig = {
            x: this.handPos[i][0],
            y: this.handPos[i][1],
            radius: 5,
            fill,
            stroke: 'black',
            strokeWidth: 1,
            draggable: true,
          };
          dotConfigList[i] = dotConfig;
        }
      }
      this.dotConfigList = dotConfigList;
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
  },
};
</script>

<style lang="scss" scoped>
.stage {
  width: 600px;
  height: 600px;
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  background-size: 600px 600px;
  background-repeat: no-repeat;
}
</style>
