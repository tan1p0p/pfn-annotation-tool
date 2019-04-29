<template>
  <aside class="save-window">
    <div class="save-window__contents box">
      <button
        class="delete is-pulled-right"
        @click="close"></button>
      <h2 class="title">Can we save?</h2>
      <file-picker
        class="save-window__file-picker"
        @set-path="setFilepath"
        :folder="true"
        message="Choose save folder."/>
      <button class="button" @click="close">cancel</button>
      <button class="button is-primary" @click="save">save</button>
    </div>
  </aside>
</template>

<script>
import FilePicker from '@/components/modules/FilePicker';

export default {
  name: 'save-window',
  components: {
    FilePicker,
  },
  data() {
    return {
      folderpath: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('save', this.folderpath);
    },
    setFilepath(folderpath) {
      this.folderpath = folderpath;
    },
  },
};
</script>


<style lang="scss" scoped>
.save-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  &__contents {
    width: 600px;
    height: 200px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__file-picker {
    margin: 1rem 0;
  }
}
</style>
