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
          this.draw();
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
        color: this.series.color,
        legend: this.series.legend,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: "{b}:{c1}",
        },
        grid: this.series.grid,

        xAxis: [
          {
            type: "category",
            data: this.series.xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                type: "dashed",
                // color: "rgba(46,96,153,0.5)", //左边线的颜色
                // width: "1",
              },
            },
            axisLabel: {
              color: "#fff",
              textStyle: {
                fontSize: this.fontSize(0.12),
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: this.series.max,
            interval: this.series.inx,
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
              textStyle: {
                fontSize: this.fontSize(0.12),
              },
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
        ],
        series: this.series.series,
      };
      this.chart.setOption(option);
    },
  },
  created() {},
  mounted() {
    this.draw();
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
};
</script>
<style lang="css" scoped>
@import "../../assets/css/componentsSty.css";
</style>