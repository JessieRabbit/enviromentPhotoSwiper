<template>
  <div id="app">
    <span class="d-block t5 text-light flex-shrink-0"> 工作環境照 </span>
    <EnvironmentPic
      :env-pictures="jobData.companyEnviromentPhoto"
      @click-img="openLightbox($event)"
      @check-images-error="imagesError($event)"
    />
    <!-- 環境照畫廊 popup 開始 -->
    <PopupEnvironmentGallery
      :show="isPopupGalleryShow"
      :lightbox-info="lightbox"
      @close="isPopupGalleryShow = false"
    />
    <!-- 環境照畫廊 popup 結束 -->
  </div>
</template>

<script>
import EnvironmentPic from "@/components/shared/job/EnvironmentPic";
import PopupEnvironmentGallery from "@/components/shared/PopupEnvironmentGallery";

export default {
  name: "App",
  components: {
    EnvironmentPic,
    PopupEnvironmentGallery,
  },
  data() {
    return {
      jobData: {
        companyEnviromentPhoto: [
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7DI1W84EPYPdF7sgzimVlTh0GATS7lcchA&usqp=CAU",
            description: "可愛的 rivera",
          },
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9zo_CLm55dhlxpskNrYlSoZEXsnIWZUeZA&usqp=CAU",
            description: "揪在一起",
          },
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFHkPeeELZBmmpOS1E8rIggp6TxAhmV-pihA&usqp=CAU",
            description: "我是熊大，就是 wayne",
          },
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMH-V61AwiHQZQoEL-Tn-glzHc0ZwzVqfqg&usqp=CAU",
            description: "洗澎澎",
          },
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGe5F199Yu3yciGjdIoxAYsoKiAvFxTcVo0Q&usqp=CAU",
            description: "我是兔兔，就是 jessie",
          },
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLVbmaJ7ejD6r1d2NgNYVfBSX4JguKv3Ugg&usqp=CAU",
            description: "可愛情侶組",
          },
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2nCftPZf9-VLi6MJFD6etB5ceb3EeW4QgfQ&usqp=CAU",
            description: "世界上最帥了",
          },
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq1e_MU_yDBuCAopMC1eSEbNBbiuQgStRSjA&usqp=CAU",
            description: "嘿嘿，秘密計畫",
          },
          {
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR80rPeUekmT_Eznl47p6QnbgCoUlHI1_77rQ&usqp=CAU",
            description: "莎利是我，悠閒自在",
          },
        ],
      },
      isPopupGalleryShow: false,
      lightbox: {
        gallery: {
          // 第幾張圖片
          imgIndex: 0,
          // 圖片資源(可擴充詳細資訊)
          imgAssets: [],
          // 是否顯示圖片頁數
          pager: false,
        },
      },
      isShowEnvironmentImages: true,
    };
  },
  computed: {
    // 環境照圖片資訊
    lightboxEnvironment() {
      // 若之後 companyEnviromentPhoto 圖片有多一些欄位，imgAssets 修改成物件自定義欄位
      return { imgAssets: this.jobData.companyEnviromentPhoto };
    },
  },
  methods: {
    // 按下環境照打開畫廊
    openLightbox(e) {
      this.isPopupGalleryShow = true;
      this.lightbox.gallery = this.lightboxEnvironment;
      this.lightbox.gallery.imgIndex = e.index || 0;
      this.lightbox.gallery.pager = true;
    },
    // 檢查環境照顯示錯誤的狀況
    imagesError(e) {
      this.isShowEnvironmentImages = !(e === 0);
    },
  },
};
</script>

<style>
#app {
  line-height: 1.5;
  font-family: Arial, 微軟正黑體, "Microsoft JhengHei", Roboto, PingFangTC,
    sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
