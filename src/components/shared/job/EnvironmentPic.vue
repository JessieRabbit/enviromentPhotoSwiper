<template>
  <div class="job-environment-pic">
    <SwiperCarousel
      v-if="envPictures.length"
      ref="carousel"
      :options="swiperOption"
    >
      <SwiperCarouselSlide
        v-for="(img, index) in imgs"
        :key="index"
        class="swiper__slider"
        @click.native="$emit('click-img', { img, index })"
      >
        <img
          :src="img.src"
          :alt="img.alt"
          :title="img.title"
          class="slider__inner__img"
          @error="onError(img.src)"
        />
        <div class="px-1 t5 slider__page">
          {{ index + 1 }}/{{ imgs.length }}
        </div>
      </SwiperCarouselSlide>
    </SwiperCarousel>
  </div>
</template>

<script>
import SwiperCarousel from "@/components/shared/swiper/SwiperCarousel";
import SwiperCarouselSlide from "@/components/shared/swiper/SwiperCarouselSlide";
import VueTypes from "vue-types";

export default {
  name: "EnvironmentPic",
  components: {
    SwiperCarousel,
    SwiperCarouselSlide,
  },
  props: {
    envPictures: VueTypes.array.def([]),
  },
  data() {
    return {
      // 環境照詳細資訊，做成自定義欄位物件，進行擴充 ex: alt、title ...等
      imgs: this.envPictures.map((pic) => {
        return {
          src: pic.url,
          alt: "環境照",
          title: "點擊看環境照大圖",
        };
      }),
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 8,
        watchOverflow: true,
      },
    };
  },
  watch: {
    "imgs.length"(length) {
      if (length <= 1) {
        this.$refs.carousel.reset();
      }
    },
  },
  methods: {
    onError(url) {
      if (!this.imgs.length) return;
      this.imgs = this.imgs.filter((img) => img.src !== url);
      this.$emit("check-images-error", this.imgs.length);
    },
  },
};
</script>

<style lang="scss" scoped>
.job-environment-pic {
  margin-top: 20px;
  overflow-x: hidden;

  .swiper {
    &__slider {
      width: auto;
    }
  }

  .slider {
    &__inner {
      &__img {
        // 寬度不固定，高度固定最大 96px
        max-height: 96px;
        cursor: pointer;
      }
    }

    &__page {
      position: absolute;
      top: 8px;
      right: 8px;
      border-radius: 10.5px;
      color: #fff;
      background-color: rgba(#000, 0.7);
      letter-spacing: 0.48px;
    }
  }
}
</style>
