<template>
  <div id="index">
    <!-- <dv-full-screen-container class="bg"> -->
    <div class="bg">
      <left1 ref="left" />
      <centre ref="center" />
      <right ref="right" />
    </div>

    <!-- <centre /> -->

    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
import left1 from "../components/Combination2/Left";
import centre from "../components/Combination2/Centre";
import right from "../components/Combination2/Right";
export default {
  data() {
    return {
      loading: true,
      fuyong: "48754",
    };
  },
  components: {
    left1,
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