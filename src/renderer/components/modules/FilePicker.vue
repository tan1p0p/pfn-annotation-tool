<template>
  <div class="file has-name is-fullwidth">
    <label class="file-label">
      <input class="file-input" v-if="!folder" type="file" @change="setPath">
      <input class="file-input" v-if="folder" type="file" @change="setPath" webkitdirectory>
      <span class="file-cta">
        <span class="file-label">
          {{ message }}
        </span>
      </span>
      <span class="file-name">
        {{ path }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'file-picker',
  props: {
    folder: Boolean,
    message: String,
  },
  data() {
    return {
      path: 'Unselected',
    };
  },
  methods: {
    setPath(event) {
      this.path = event.target.files[0].path;
      this.$emit('set-path', this.path);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
