<template>
  <div class="wrapper" :id="id"></div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
const echarts = require("echarts");
export default {
  components: {},
  mixins: [echartMixins],
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
    tooltip: {
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
  },
  data() {
    return {
      chart: undefined,
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
      this.chart = echarts.init(document.getElementById(this.id));
      this.setOption();
    },
    setOption() {
      if (!this.chart) return;
      let option = {
        color: ["#01FFF5", "#F54D4D", "#24D4FF"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.series.legend.data,
          top: "0",
          itemGap: this.fontSize(0.18),
          align: "left",
          itemHeight: this.fontSize(0.08),
          itemWidth: this.fontSize(0.2),
          textStyle: {
            color: "#fff",
            fontSize: this.fontSize(0.12),
          },
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(46,96,153,0.5)", //左边线的颜色
              // width: "1",
            },
          },
          axisLabel: {
            color: "#fff",
            fontSize: this.fontSize(0.12),
          },
          data: this.series.xdata,
        },
        yAxis: {
          type: "value",
          splitNumber: 3,
          boundaryGap: ["0", "5%"],
          axisLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "rgba(46,96,153,0.5)", //左边线的颜色
              // width: "1",
            },
          },

          axisLabel: {
            color: "#fff",
            fontSize: this.fontSize(0.12),
          },
          splitLine: {
            show: true,
            interval: 4,
            lineStyle: {
              color: "rgba(46,96,153,0.5)",
              type: "dashed",
            },
          },
        },
        series: this.series.series,
      };
      this.chart.setOption(option);
    },
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
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