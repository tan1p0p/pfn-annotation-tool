<template>
  <section class="section has-text-centered">
    <h1 class="title">Hand Pose Annotator</h1>
    <div
      v-if="!isFilePicked">
      <data-loader
        @set-path="loadFiles"></data-loader>
    </div>
    <div v-show="isFilePicked">
    <!-- <div> -->
      <p>Click <a @click="isKeyBindVisible = true">here</a> or press "h" to see keybinds.</p>
      <main-canvas
        ref="mainCanvas"
        :filepath="currentFilePath"
        :handPos="currentHandPos"
        :imageIdx="imageIdx"></main-canvas>
      <aside class="key-binds" v-if="isKeyBindVisible">
        <div class="key-binds__list box">
          <button
            class="delete is-pulled-right"
            @click="isKeyBindVisible = false"></button>
          <h2 class="title">Key Binds</h2>
          <ul>
            <li>Press "s" to save annotation file.</li>
            <li>Press "r" to reset current annotation.</li>
            <li>Press "n" to go to next image.</li>
            <li>Press "b" to back to previous image.</li>
            <li>Press "x" to flip vertically.</li>
            <li>Press "z" to flip horizontally.</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<script>
import DataLoader from '@/components/modules/DataLoader';
import MainCanvas from '@/components/modules/MainCanvas';

import fs from 'fs';
import path from 'path';

export default {
  name: 'main-page',
  components: {
    DataLoader,
    MainCanvas,
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
    };
  },
  computed: {
    isFilePicked() {
      if (this.imageIdx === -1) {
        return false;
      }
      return true;
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
            this.downloadPosList();
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
    downloadPosList() {
      const outputJSON = {
        fileList: this.fileList,
        posList: this.posList,
      };
      fs.writeFileSync(`${this.folderPath}/hand_position.json`, JSON.stringify(outputJSON));
    },
    resetCurrentPos() {
      for (let i = 0; i < this.defaultPos.length; i += 1) {
        this.posList[this.imageIdx][i] = this.defaultPos[i];
      }
      this.$refs.mainCanvas.render();
    },
    flipPos(direct) {
      if (direct === 'horizontal') {
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
  },
};
</script>

<style lang="scss" scoped>
.key-binds {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  &__list {
    width: 600px;
    height: 300px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
