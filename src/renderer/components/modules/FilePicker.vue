<template>
  <input type="file" @change="setPath">
</template>

<script>
export default {
  name: 'file-picker',
  methods: {
    setPath(event) {
      this.$emit('set-path', event.target.files[0].path);
    },
  },
};
</script>
