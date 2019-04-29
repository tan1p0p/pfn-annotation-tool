<template>
  <section class="section has-text-centered">
    <h1 class="title">Hand Pose Annotator</h1>
    <div v-if="!isFilePicked">
      <data-loader @set-path="loadFiles"/>
    </div>
    <div v-show="isFilePicked">
      <p>Click <a @click="isKeyBindVisible = true">here</a> or press "h" to see keybinds.</p>
      <main-canvas
        ref="mainCanvas"
        :filepath="currentFilePath"
        :handPos="currentHandPos"
        :imageIdx="imageIdx"/>
      <key-binds
        v-if="isKeyBindVisible"
        @close="isKeyBindVisible = false"/>
      <save-window
        v-if="isSaveWindowVisible"
        @close="isSaveWindowVisible = false"
        @save="savePosList"/>
    </div>
  </section>
</template>

<script>
import DataLoader from '@/components/modules/DataLoader';
import MainCanvas from '@/components/modules/MainCanvas';
import KeyBinds from '@/components/modules/KeyBinds';
import SaveWindow from '@/components/modules/SaveWindow';

import fs from 'fs';
import path from 'path';

export default {
  name: 'main-page',
  components: {
    DataLoader,
    MainCanvas,
    KeyBinds,
    SaveWindow,
  },
  data() {
    return {
      width: 600,
      height: 600,
      folderPath: '',
      JSONPath: '',
      fileList: [],
      // posList: [[origin, thumb_DIP, thumb_PIP, thumb_MP,
      //            pointer..., middle..., ring..., pinkie...], ...]
      // Each point has [width, height] array.
      posList: [],
      // TODO: make isImageLoaded prop.
      imageIdx: -1,
      defaultPos: [
        [410, 350],
        [310, 100], [360, 150], [410, 200],
        [130, 210], [210, 230], [290, 250],
        [110, 330], [190, 330], [270, 330],
        [130, 440], [210, 420], [300, 400],
        [190, 530], [250, 500], [320, 450],
      ],
      isKeyBindVisible: false,
      isSaveWindowVisible: false,
    };
  },
  computed: {
    isFilePicked() {
      return this.imageIdx !== -1;
    },
    currentFilePath() {
      return this.fileList[this.imageIdx];
    },
    currentHandPos() {
      return this.posList[this.imageIdx];
    },
  },
  mounted() {
    window.addEventListener('keydown', (event) => {
      if (this.isFilePicked) {
        switch (event.keyCode) {
          case 78: // 'n' key for next pic.
            this.goNextImage();
            break;
          case 66: // 'b' key for previous pic.
            this.goPreviousImage();
            break;
          case 37: // '←' key for move left.
            this.moveParallel('horizontal', 'minus', event.shiftKey ? 3 : 1);
            break;
          case 38: // '↑' key for move up.
            this.moveParallel('vertical', 'minus', event.shiftKey ? 3 : 1);
            break;
          case 39: // '→' key for move right.
            this.moveParallel('horizontal', 'plus', event.shiftKey ? 3 : 1);
            break;
          case 40: // '↓' key for move down.
            this.moveParallel('vertical', 'plus', event.shiftKey ? 3 : 1);
            break;
          default:
            break;
        }
      }
    });
    window.addEventListener('keyup', (event) => {
      if (this.isFilePicked) {
        switch (event.keyCode) {
          case 72: // 'h' key for show keybinds.
            this.isKeyBindVisible = !this.isKeyBindVisible;
            break;
          case 83: // 's' key for save pos.
            this.isSaveWindowVisible = !this.isSaveWindowVisible;
            break;
          case 82: // 'r' key for reset to default pos.
            this.resetCurrentPos();
            break;
          case 90: // 'z' key for flip horizontal.
            this.flipPos('horizontal');
            break;
          case 88: // 'x' key for flip vertical.
            this.flipPos('vertical');
            break;
          default:
            break;
        }
      }
    });
  },
  methods: {
    loadFiles([imageDir, JSONPath]) {
      this.loadImages(imageDir);
      if (JSONPath !== '') {
        this.loadHandPos(JSONPath);
      }
    },
    loadImages(folderPath) {
      this.folderPath = folderPath;

      const files = fs.readdirSync(folderPath);
      for (let i = 0; i < files.length; i += 1) {
        const filename = files[i];
        const ext = path.extname(filename);
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
          this.fileList.push(`${folderPath}/${filename}`);
        }
      }
      this.posList = new Array(this.fileList.length);
      for (let i = 0; i < this.posList.length; i += 1) {
        this.posList[i] = Array.from(this.defaultPos);
      }
      this.imageIdx = 0;
    },
    loadHandPos(filePath) {
      const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (let i = 0; i < this.posList.length; i += 1) {
        this.posList[i] = json.posList[i];
      }
    },
    goNextImage() {
      if (this.imageIdx < this.fileList.length - 1) {
        this.imageIdx += 1;
      }
    },
    goPreviousImage() {
      if (this.imageIdx >= 1) {
        this.imageIdx -= 1;
      }
    },
    savePosList(folderPath) {
      const outputJSON = {
        fileList: this.fileList,
        posList: this.posList,
      };
      fs.writeFileSync(`${folderPath}/hand_position.json`, JSON.stringify(outputJSON));
      this.isSaveWindowVisible = false;
    },
    resetCurrentPos() {
      for (let i = 0; i < this.defaultPos.length; i += 1) {
        this.posList[this.imageIdx][i] = this.defaultPos[i];
      }
      this.$refs.mainCanvas.render();
    },
    flipPos(direction) {
      if (direction === 'horizontal') {
        for (let i = 0; i < this.defaultPos.length; i += 1) {
          this.posList[this.imageIdx][i][0] = this.width - this.posList[this.imageIdx][i][0];
        }
      } else {
        for (let i = 0; i < this.defaultPos.length; i += 1) {
          this.posList[this.imageIdx][i][1] = this.height - this.posList[this.imageIdx][i][1];
        }
      }
      this.$refs.mainCanvas.render();
    },
    moveParallel(direction, sign, scale = 1) {
      let amount = 10;
      if (sign === 'minus') {
        amount = -amount;
      }
      if (direction === 'horizontal') {
        for (let i = 0; i < this.defaultPos.length; i += 1) {
          this.posList[this.imageIdx][i][0] += amount * scale;
        }
      } else {
        for (let i = 0; i < this.defaultPos.length; i += 1) {
          this.posList[this.imageIdx][i][1] += amount * scale;
        }
      }
      this.$refs.mainCanvas.render();
    },
  },
};
</script>
