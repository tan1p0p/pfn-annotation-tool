<template>
  <div>
    <folder-picker @set-folder="setFilelist"></folder-picker>
    <main-canvas :fileList="fileList" :posList="posList" :imageIdx="imageIdx"></main-canvas>
  </div>
</template>

<script>
  import FolderPicker from '@/components/modules/FolderPicker';
  import MainCanvas from '@/components/modules/MainCanvas';

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
        imageIdx: -1,
      };
    },
    methods: {
      setFilelist(folderPath) {
        this.folderPath = folderPath;
        const fs = require('fs');
        const path = require('path');

        const files = fs.readdirSync(folderPath);
        for (let i = 0; i < files.length; i += 1) {
          const filename = files[i];
          const ext = path.extname(filename);
          if (ext === '.jpg' || ext === 'jpeg' || ext === '.png') {
            this.fileList.push(`${folderPath}/${filename}`);
          }
        }
        // TODO: Set default value like human hand pos.
        const defaultPos = new Array(16).fill([0, 0]);
        this.posList = new Array(this.fileList.length).fill(defaultPos);
        this.imageIdx = 0;
      },
    },
  };
</script>