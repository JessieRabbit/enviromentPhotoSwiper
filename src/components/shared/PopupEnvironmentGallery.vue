<template>
  <div class="job-light-box-gallery">
    <div v-if="show" v-body-lock class="popup-image position-fixed pt-top pt-6">
      <div class="job-swiper">
        <div class="popup-image__head position-absolute w-100">
          <div class="pt-container px-6 py-4">
            <font-awesome-icon
              icon="fa-solid fa-xmark"
              size="lg"
              @click="onClose"
            />
          </div>
        </div>
        <SwiperCarousel
          v-if="lightboxInfo.gallery.imgAssets.length"
          ref="carousel"
          class="h-100 overflow-hidden"
          :navigation="true"
          :options="{
            slidesPerView: 1,
            allowTouchMove: true,
            initialSlide: lightboxInfo.gallery.imgIndex,
            watchOverflow: true,
            navigation: navigationEl,
          }"
          :active-index="lightboxInfo.gallery.imgIndex"
          :style="{
            '--swiper-navigation-size': '24px',
            '--swiper-navigation-color': '#FFF',
          }"
        >
          <SwiperCarouselSlide
            v-for="(img, index) in lightboxInfo.gallery.imgAssets"
            :key="index"
          >
            <div
              v-if="lightboxInfo.gallery.pager"
              class="t3 text-center text-white mb-4"
            >
              {{ index + 1 }}/{{ lightboxInfo.gallery.imgAssets.length }}
            </div>
            <span> {{ img.description }}</span>
            <img
              :src="img.url"
              class="lightbox-gallery__slide__img"
              @error="onError(img.url)"
            />
          </SwiperCarouselSlide>
        </SwiperCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import SwiperCarousel from "@/components/shared/swiper/SwiperCarousel";
import SwiperCarouselSlide from "@/components/shared/swiper/SwiperCarouselSlide";
import VueTypes from "vue-types";

export default {
  name: "PopupEnvironmentGallery",
  components: {
    SwiperCarousel,
    SwiperCarouselSlide,
  },
  props: {
    show: VueTypes.bool.def(false),
    lightboxInfo: VueTypes.object.def({}),
  },
  data() {
    return {
      navigationEl: {
        nextEl: ".lightbox-gallery__next-btn",
        prevEl: ".lightbox-gallery__prev-btn",
      },
    };
  },
  watch: {
    "lightboxInfo.gallery.imgAssets.length"(length) {
      if (length <= 1) {
        this.$refs.carousel.reset();
      }
    },
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
    onError(url) {
      if (!this.lightboxInfo.gallery.imgAssets.length) return;
      this.lightboxInfo.gallery.imgAssets.filter((img) => img !== url);
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-image {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1050;
  min-width: 320px;
  background-color: #000;
  color: #FFF;
  overflow-x: hidden;

  &__head {
    top: 0;
    left: 0;
    z-index: 1060;
    padding: 20px;
    cursor: pointer;
    text-align: right;
  }
}

.lightbox-gallery {
  &__slide {
    &__img {
      width: 100%;
      height: calc(100vh - 240px);
      object-fit: contain;
    }
  }
}

::v-deep {
  .lightbox-gallery__prev-btn,
  .lightbox-gallery__next-btn {
    background-color: #292929;
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }
}
</style>
