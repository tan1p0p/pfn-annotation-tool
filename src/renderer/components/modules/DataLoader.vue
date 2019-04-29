<template>
  <div class="dataloader has-text-centered">
    <h2 class="subtitle">Choose image folder and savefile.</h2>
    <file-picker @set-path="setImageDir" :folder="true" message="image folder"/>
    <br>
    <file-picker @set-path="setJSONPath" :folder="false" message="save file (optional)"/>
    <br>
    <button class="button is-primary" @click="setPath">load files</button>
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

<style lang="scss" scoped>
.dataloader {
  margin: 5rem 0;
}
</style>
