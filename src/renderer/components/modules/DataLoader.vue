<template>
  <div class="container has-text-centered">
    <file-picker @set-path="setImageDir" :folder="true" message="Choose a image directory"></file-picker>
    <br>
    <file-picker @set-path="setJSONPath" :folder="false" message="Choose a save file... (optional)"></file-picker>
    <br>
    <button class="button is-primary" @click="setPath">Load files</button>
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

</style>
