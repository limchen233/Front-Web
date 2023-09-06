<template>
  <div class="export-container">
    <div
      :class="{
        'export-container-horizontal': !vertical
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 是否横向打印
      vertical: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .export-container {
    position: relative;
    // A4纸大小
    width: 1052px;
    height: 1488px;

    // border: 1px solid $primary-font;

    & > div {
      padding: 32px;
    }

    // font-family: Simsun, PingFangSC-Regular, PingFang SC;

    // 横向
    .export-container-horizontal {
      position: absolute;
      left: 50%;
      top: 50%;

      transform: translate(-50%, -50%) rotate(90deg);
      -webkit-transform: translate(-50%, -50%) rotate(90deg);

      width: 1488px;
      height: 1052px;
    }
  }
</style>
