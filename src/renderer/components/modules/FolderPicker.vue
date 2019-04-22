<template>
  <div>
    <label>画像のディレクトリを選択</label>
    <input type="file" webkitdirectory @change="selectFolder">
    <button @click="setFolder">読み込む</button>
  </div>
</template>

<script>
export default {
  name: 'FolderPicker',
  data() {
    return {
      folderPath: '',
    };
  },
  methods: {
    selectFolder(event) {
      this.folderPath = event.target.files[0].path;
    },
    setFolder() {
      this.$emit('set-folder', this.folderPath);
    },
  },
};
</script>
