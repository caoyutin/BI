<template>
  <div id="index">
    <!-- <dv-full-screen-container class>
      <page2 ref="page2" />
      <page1 ref="page1" />
    </dv-full-screen-container>-->
    <!-- <el-carousel
      indicator-position="none"
      style="width: 100%; height: 100vh;"
      :autoplay="false"
      :interval="8000"
    >
      <el-carousel-item style="width: 100%; height: 100vh">
        <page2 ref="page2" />
      </el-carousel-item>
      <el-carousel-item style="width: 100%; height: 100vh">
        <page1 ref="page1" />
      </el-carousel-item>
    </el-carousel>-->

    <nut-swiper
      direction="horizontal"
      :loop="true"
      :canDragging="false"
      :paginationVisible="true"
      :speed="1000"
      ref="demo3"
    >
      <div class="nut-swiper-slide gray">
        <page1 ref="page1" />
      </div>
      <!-- <div class="nut-swiper-slide gray_1">
        <page2 ref="page2" />
      </div>-->
    </nut-swiper>
  </div>
</template>

<script>
import page1 from "./page1";
import page2 from "./page2";
export default {
  data() {
    return {
      loading: true,
      fuyong: "48754",
      page: ["<page1/>", "<page2/>"],
    };
  },
  components: {
    page1,
    page2,
  },
  mounted() {
    // this.cancelLoading();
  },
  methods: {
    cancelLoading() {
      // setInterval(() => {}, 1000);
      // this.$refs.page2.reload();

      this.$refs.page1.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
.nut-swiper {
  height: auto;
}
body,
html {
  width: 100%;
  height: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__container {
  width: 1920px;
  height: 1080px;
}
</style>