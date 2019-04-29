<template>
  <aside class="key-binds">
    <div class="key-binds__list box">
      <button
        class="delete is-pulled-right"
        @click="close"></button>
      <h2 class="title">Key Binds</h2>
      <div class="tile is-parent">
        <div
          class="tile is-child"
          v-for="(keybinds, i) in keybindsList"
          :key="i">
          <table class="table">
            <tr class="thead">
              <th>key</th>
              <th>action</th>
            </tr>
            <tr
              class="tbody"
              v-for="(keybind, j) in keybinds"
              :key="j">
              <td>{{ keybind[0] }}</td>
              <td>{{ keybind[1] }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'key-binds',
  data() {
    return {
      keybindsList: [
        [
          ['s', 'save annotation file'],
          ['r', 'reset current annotation'],
          ['n', 'go to next image'],
          ['b', 'back to previous image'],
          ['x', 'flip vertically'],
          ['z', 'flip horizontally'],
          ['h', 'open / close this menu'],
        ], [
          ['↑', 'move 10px above'],
          ['↓', 'move 10px below'],
          ['→', 'move 10px right'],
          ['←', 'move 10px left'],
          ['Shift + ↑', 'move 30px above'],
          ['Shift + ↓', 'move 30px below'],
          ['Shift + →', 'move 30px right'],
          ['Shift + ←', 'move 30px left'],
        ],
      ],
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.key-binds {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  &__list {
    width: 600px;
    height: 600px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
