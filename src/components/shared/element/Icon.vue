<template>
  <svg class="icon" aria-hidden="true" :style="dimension">
    <use :xlink:href="`#${iconName}`" />
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  computed: {
    dimension() {
      return { width: this.size + "px", height: this.size + "px" };
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: -0.15em;
  fill: currentColor !important;
  overflow: hidden;
}
</style>
