<template>
  <div id="index">
    <!-- <dv-full-screen-container class="bg"> -->
    <div class="bg">
      <left ref="left" />
      <centre ref="center" />
      <right ref="right" />
    </div>

    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
import left from "../components/Combination/Left";
import centre from "../components/Combination/Centre";
import right from "../components/Combination/Right";
export default {
  data() {
    return {
      loading: true,
      fuyong: "48754",
    };
  },
  components: {
    left,
    centre,
    right,
  },
  mounted() {
    // this.cancelLoading();
  },
  methods: {
    reload() {
      this.$refs.left.draw();
      this.$refs.center.draw();
      this.$refs.right.draw();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

body,
html {
  width: 100%;
  height: 100%;
}
</style>