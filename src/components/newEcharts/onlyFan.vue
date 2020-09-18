<template>
  <div class="wrapper" :id="id"></div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
import mixin from "@/utils/mixin";
// import BI from "@/assets/them.js";
const echarts = require("echarts");
export default {
  components: {},
  mixins: [echartMixins, mixin],
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: Object,
      default() {
        return {};
      },
    },

    series: {
      type: Object,
      default() {
        return {};
      },
    },
    // roseType: {
    //   type: String,
    //   default: ""
    // },
    stylelist: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // chart: undefined,
      // id: "onlyfan"
    };
  },
  watch: {
    series: {
      handler(val, oldVal) {
        this.series = val;
        this.$nextTick(() => {
          this.setOption();
        });
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    draw() {
      this.chart = echarts.init(document.getElementById(this.id), "BI");
      this.setOption();
    },

    setOption() {
      if (!this.chart) return;
      let option = {
        color: this.series.color,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          textStyle: {
            fontSize: "5%",
          },
        },
        title: this.series.title,
        // center: ["35%", "100%"],
        graphic: this.series.graphic,
        series: this.series.series,
      };
      this.chart.setOption(option);
    },
    beforeDestroy() {
      if (!this.chart) return;
      this.chart.dispose();
      this.chart = null;
      window.onresize = null;
    },
  },

  created() {},
  mounted() {
    this.draw();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/componentsSty.css";
</style>