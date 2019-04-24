<template>
  <div>
    <folder-picker @set-folder="setFilelist"></folder-picker>
    <main-canvas
      ref="mainCanvas"
      :filepath="currentFilePath"
      :handPos="currentHandPos"
      :imageIdx="imageIdx"></main-canvas>
  </div>
</template>

<script>
import FolderPicker from '@/components/modules/FolderPicker';
import MainCanvas from '@/components/modules/MainCanvas';

import fs from 'fs';
import path from 'path';

export default {
  name: 'main-page',
  components: {
    FolderPicker,
    MainCanvas,
  },
  data() {
    return {
      folderPath: '',
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
    };
  },
  computed: {
    currentFilePath() {
      return this.fileList[this.imageIdx];
    },
    currentHandPos() {
      return this.posList[this.imageIdx];
    },
  },
  mounted() {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 78) {
        this.goNextImage();
      } else if (event.keyCode === 66) {
        this.goPreviousImage();
      }
    });
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 83) {
        this.downloadPosList();
      } else if (event.keyCode === 82) {
        this.resetCurrentPos();
      }
    });
  },
  methods: {
    setFilelist(folderPath) {
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
    goNextImage() {
      if (this.imageIdx < this.fileList.length - 1) {
        this.imageIdx += 1;
      }
    },
    goPreviousImage() {
      if (this.imageIdx > 0) {
        this.imageIdx -= 1;
      }
    },
    downloadPosList() {
      if (this.imageIdx >= 0) {
        const outputJSON = {
          fileList: this.fileList,
          posList: this.posList,
        };
        fs.writeFileSync(`${this.folderPath}/hand_position.json`, JSON.stringify(outputJSON));
      }
    },
    resetCurrentPos() {
      if (this.imageIdx >= 0) {
        for (let i = 0; i < this.defaultPos.length; i += 1) {
          this.posList[this.imageIdx][i] = this.defaultPos[i];
        }
        this.$refs.mainCanvas.render();
      }
    },
  },
};
</script>