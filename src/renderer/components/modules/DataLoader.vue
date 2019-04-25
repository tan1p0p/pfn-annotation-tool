<template>
  <div>
    <label>画像ディレクトリ：</label>
    <file-picker @set-path="setImageDir" webkitdirectory></file-picker>
    <br>
    <label>セーブファイル：</label>
    <file-picker @set-path="setJSONPath"></file-picker>
    <br>
    <button @click="setPath">読み込む</button>
  </div>
</template>

<script>
import FilePicker from '@/components/modules/FilePicker';

export default {
  name: 'data-loader',
  components: {
    FilePicker,
  },
  data() {
    return {
      imageDir: '',
      JSONPath: '',
    };
  },
  methods: {
    setImageDir(dirPath) {
      this.imageDir = dirPath;
    },
    setJSONPath(filePath) {
      this.JSONPath = filePath;
    },
    setPath() {
      this.$emit('set-path', [this.imageDir, this.JSONPath]);
    },
  },
};
</script>
