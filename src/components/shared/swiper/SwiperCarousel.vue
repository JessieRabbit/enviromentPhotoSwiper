<template>
  <div class="swiper-carousel">
    <div v-if="$slots.default" class="swiper-container" :class="containerClass">
      <div ref="swiperWrapper" class="swiper-wrapper">
        <slot />
      </div>

      <div
        v-if="scrollbar"
        class="swiper-scrollbar"
        :class="[`swiper-scrollbar${_uid}`, scrollbarClass]"
      />
    </div>

    <div
      v-if="pagination"
      class="swiper-pagination"
      :class="[`swiper-pagination${_uid}`, paginationClass]"
    />

    <div v-if="navigation" class="swiper-navigation">
      <div
        class="swiper-button-prev"
        :class="[`swiper-button-prev${_uid}`, navigationPrevClass]"
      >
        <slot name="navigation-prev" />
      </div>

      <div
        class="swiper-button-next"
        :class="[`swiper-button-next${_uid}`, navigationNextClass]"
      >
        <slot name="navigation-next" />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

let swiper = {};

const defaultPagination = (id = "") => ({
  el: `.swiper-pagination${id}`,
});

const defaultNavigation = (id = "") => ({
  nextEl: `.swiper-button-next${id}`,
  prevEl: `.swiper-button-prev${id}`,
});

const defaultScrollbar = (id = "") => ({
  el: `.swiper-scrollbar${id}`,
});

export default {
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    el: {
      type: String,
      default: "",
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    navigation: {
      type: Boolean,
      default: false,
    },
    scrollbar: {
      type: Boolean,
      default: false,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    paginationOptions() {
      const { pagination = {} } = this.options;
      return this.pagination
        ? { pagination: { ...defaultPagination(this._uid), ...pagination } }
        : {};
    },
    navigationOptions() {
      const { navigation = {} } = this.options;
      return this.navigation
        ? { navigation: { ...defaultNavigation(this._uid), ...navigation } }
        : {};
    },
    scrollbarOptions() {
      const { scrollbar = {} } = this.options;
      return this.scrollbar
        ? { scrollbar: { ...defaultScrollbar(this._uid), ...scrollbar } }
        : {};
    },
    containerClass() {
      return this.el.replace(".", "") || `swiper-container${this._uid}`;
    },
    paginationClass() {
      const { pagination = {} } = this.options;
      const { el = "" } = pagination;
      return el.replace(".", "") || "";
    },
    navigationPrevClass() {
      const { navigation = {} } = this.options;
      const { prevEl = "" } = navigation;
      return prevEl.replace(".", "") || "";
    },
    navigationNextClass() {
      const { navigation = {} } = this.options;
      const { nextEl = "" } = navigation;
      return nextEl.replace(".", "") || "";
    },
    scrollbarClass() {
      const { scrollbar = {} } = this.options;
      const { el = "" } = scrollbar;
      return el.replace(".", "") || "";
    },
  },
  watch: {
    activeIndex(val) {
      swiper[this.containerClass].slideTo(val);
    },
  },
  mounted() {
    this.register();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    register() {
      const options = {
        ...this.options,
        ...this.paginationOptions,
        ...this.navigationOptions,
      };
      swiper[this.containerClass] = new Swiper(
        `.${this.containerClass}`,
        options
      );
      swiper[this.containerClass].slideTo(this.activeIndex);
    },
    destroy() {
      const { destroyed } = swiper[this.containerClass];
      if (!destroyed) swiper[this.containerClass].destroy();
    },
    reset() {
      this.destroy();
      this.register();
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-carousel {
  position: relative;

  .swiper-container {
    height: 100%;
  }

  .swiper-pagination {
    width: 100%;

    &-lock {
      display: none;
    }
  }
}
</style>
