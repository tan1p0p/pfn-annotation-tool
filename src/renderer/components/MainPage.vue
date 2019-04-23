<template>
  <div>
    <folder-picker @set-folder="setFilelist"></folder-picker>
    <main-canvas :filepath="fileList[imageIdx]" :handPos="posList[imageIdx]"></main-canvas>
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
        imageIdx: -1,
      };
    },
    methods: {
      setFilelist(folderPath) {
        this.folderPath = folderPath;

        const files = fs.readdirSync(folderPath);
        for (let i = 0; i < files.length; i += 1) {
          const filename = files[i];
          const ext = path.extname(filename);
          if (ext === '.jpg' || ext === 'jpeg' || ext === '.png') {
            this.fileList.push(`${folderPath}/${filename}`);
          }
        }
        // TODO: Set default value like human hand pos.
        // const defaultPos = new Array(16).fill([0, 0]);
        const defaultPos = [
          [400, 400], // origin
          [300, 150], [350, 150], [400, 150], // thumb_DIP, thumb_PIP, thumb_MP,
          [100, 250], [200, 250], [300, 250], // pointer,
          [100, 350], [200, 350], [300, 350], // middle,
          [100, 450], [200, 450], [300, 450], // ring,
          [100, 550], [200, 550], [300, 550]];// pickle,
        this.posList = new Array(this.fileList.length).fill(defaultPos);
        this.imageIdx = 0;
      },
    },
  };
</script>